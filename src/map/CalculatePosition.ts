type lineGeoJSON = {
  features: feature[]
}
type feature = {
  type: string | "LineString",
  geometry: { coordinates: coordinate[] }
}
type coordinate = [number, number]

const loadPointsFromLine = async (lineid: string): Promise<coordinate[][]> => {
  const geojson = await (await fetch(`/routes/${lineid}.geojson`)).json() as lineGeoJSON;
  return geojson.features.filter(f => f.type === "LineString").map(f => f.geometry.coordinates);
}

const distance = (start: coordinate, end: coordinate, point: coordinate) => {
  const distance =
    (
      (Math.abs(
        (end[1] - start[1]) * point[0]
        - (end[0] - start[0]) * point[1]
        + end[0] * start[1]
        - end[1] * start[0]))
      /
      (Math.pow(
        (Math.pow(end[1] - start[1], 2)
          + Math.pow(end[0] - start[0], 2)
        ), 0.5)));
  return distance;
}

const calculateShortestDistance = (point: coordinate, line: [coordinate, coordinate]): { distance: number, point: coordinate } => {

  return { distance: 0, point: [0, 0] };
}