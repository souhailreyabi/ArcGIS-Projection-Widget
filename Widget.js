
define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/on',
  'dojo/dom',
  'dojo/dom-style',
  'dojo/query',
  'esri/geometry/Point',
  'esri/geometry/Polygon',
  'esri/SpatialReference',
  'esri/graphic',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/Color',
  'esri/geometry/projection',
  'esri/graphicsUtils'
], function(declare, BaseWidget, on, dom, domStyle, query, Point, Polygon, SpatialReference, Graphic, SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, Color, projection, graphicsUtils) {

  return declare([BaseWidget], {
    baseClass: 'projeter-widget',
    graphics: [],

    onOpen: function() {
      const radios = this.domNode.querySelectorAll("input[name='mode']");
      const pointSection = this.domNode.querySelector("#pointSection");
      const polygonSection = this.domNode.querySelector("#polygonSection");
      const crsSelect = this.domNode.querySelector("#crsSelect");
      const xLabel = this.domNode.querySelector("#xLabel");
      const yLabel = this.domNode.querySelector("#yLabel");

      // Toggle Point / Polygon
      radios.forEach((r) => {
        this.own(on(r, "change", () => {
          if (r.value === "point") {
            domStyle.set(pointSection, "display", "block");
            domStyle.set(polygonSection, "display", "none");
          } else {
            domStyle.set(pointSection, "display", "none");
            domStyle.set(polygonSection, "display", "block");
          }
        }));
      });

      // Labels dynamiques
      this.own(on(crsSelect, "change", () => {
        if (crsSelect.value == "4326") {
          xLabel.innerHTML = "Longitude :";
          yLabel.innerHTML = "Latitude :";
          this.domNode.querySelector("#xCoord").placeholder = "ex: 2.35";
          this.domNode.querySelector("#yCoord").placeholder = "ex: 48.85";
        } else if (crsSelect.value == "26191") {
          xLabel.innerHTML = "X :";
          yLabel.innerHTML = "Y :";
          this.domNode.querySelector("#xCoord").placeholder = "ex: 290000";
          this.domNode.querySelector("#yCoord").placeholder = "ex: 330000";
        } else if (crsSelect.value == "102191") {
          xLabel.innerHTML = "X (Deg) :";
          yLabel.innerHTML = "Y (Deg) :";
          this.domNode.querySelector("#xCoord").placeholder = "ex: -7.65";
          this.domNode.querySelector("#yCoord").placeholder = "ex: 33.57";
        }
      }));

      // Projection et dessin
      const btn = this.domNode.querySelector("#projectAndDraw");
      if (btn) {
        this.own(on(btn, "click", this.projectAndDraw.bind(this)));
      }

      // Suppression des entités
      this.own(on(this.domNode.querySelector("#deleteEntities"), "click", this.deleteEntities.bind(this)));
    },

    showAlert: function(message, type = 'success') {
      const alertBox = this.domNode.querySelector("#customAlert");
      if (!alertBox) return;

      alertBox.innerHTML = message;
      alertBox.className = "custom-alert"; // reset
      if (type === 'error') {
        alertBox.classList.add("error");
      }

      alertBox.style.display = 'block';
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 3000);
    },

    projectAndDraw: function() {
      const mode = this.domNode.querySelector("input[name='mode']:checked").value;
      const crs = parseInt(this.domNode.querySelector("#crsSelect").value);
      const spatialRef = new SpatialReference(crs);

      projection.load().then(() => {
        if (mode === "point") {
          const x = parseFloat(this.domNode.querySelector("#xCoord").value);
          const y = parseFloat(this.domNode.querySelector("#yCoord").value);
          if (isNaN(x) || isNaN(y)) {
            this.showAlert("Coordonnées invalides !", "error");
            return;
          }
          const point = new Point(x, y, spatialRef);
          const projectedPoint = projection.project(point, this.map.spatialReference);

          const color = this.domNode.querySelector("#pointColor").value;
          const size = parseInt(this.domNode.querySelector("#pointSize").value);
          const outlineColor = this.domNode.querySelector("#pointOutlineColor").value;

          const sym = new SimpleMarkerSymbol()
            .setColor(new Color(color))
            .setSize(size)
            .setOutline(new SimpleLineSymbol().setColor(new Color(outlineColor)));

          const graphic = new Graphic(projectedPoint, sym);
          this.map.graphics.add(graphic);
          this.graphics.push(graphic);
          this.map.centerAndZoom(projectedPoint, 14);
          this.showAlert("Point projeté !");
        } 
        else if (mode === "polygon") {
          const polyInput = this.domNode.querySelector("#polygonCoords").value;
          if (!polyInput) {
            this.showAlert("Veuillez entrer un polygone", "error");
            return;
          }
          try {
            const rings = JSON.parse(polyInput);
            const polygon = new Polygon({ rings: [rings], spatialReference: spatialRef });
            const projectedPolygon = projection.project(polygon, this.map.spatialReference);

            const lineColor = this.domNode.querySelector("#lineColor").value;
            const lineWidth = parseInt(this.domNode.querySelector("#lineWidth").value);
            const lineStyle = this.domNode.querySelector("#lineStyle").value;
            const fillType = this.domNode.querySelector("#fillStyle").value;
            const fillColor = this.domNode.querySelector("#fillColor").value;
            const opacity = parseFloat(this.domNode.querySelector("#opacity").value);

            const outline = new SimpleLineSymbol(
              lineStyle,
              new Color(lineColor),
              lineWidth
            );

            let fill = (fillType === "transparent") ? new Color([0, 0, 0, 0]) : new Color(fillColor);
            fill.a = opacity; // Applique la transparence

            const sym = new SimpleFillSymbol()
              .setColor(fill)
              .setOutline(outline);

            const graphic = new Graphic(projectedPolygon, sym);
            this.map.graphics.add(graphic);
            this.graphics.push(graphic);
            this.map.setExtent(projectedPolygon.getExtent().expand(1.5));
            this.showAlert("Polygone projeté !");
          } catch (e) {
            this.showAlert("Erreur dans le format JSON du polygone", "error");
          }
        }
      });
    },

    deleteEntities: function() {
      this.map.graphics.clear();
      this.graphics = [];
      this.showAlert("Toutes les entités ont été supprimées !");
    }

  });
});
