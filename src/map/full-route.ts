import maplibregl, { LngLatLike } from "maplibre-gl";

// todo: instead of fireing this every time - do it once during line change
export async function showFullRoute(map: maplibregl.Map, lineid: string) {
  const res = await fetch(`/routes/${lineid}.geojson`);
  const lineData = await res.json() as GeoJSON.FeatureCollection;
  const points = lineData.features.filter(f => f.geometry.type === "Point")
  const coordinates = points.map(p => (p.geometry as GeoJSON.Point).coordinates);
  fitBounds(map, coordinates as LngLatLike[]);
}

function fitBounds(map: maplibregl.Map, coordinates: LngLatLike[]) {

  // Create a bounding box from the coordinates
  const bounds = coordinates.reduce((bounds, coord) => {
    return bounds.extend(coord);
  }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));

  // Fit the map to the bounds of the points
  map.fitBounds(bounds, {
    padding: 100,
    duration: 2000
  });
}