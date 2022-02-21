exports.withinRadius = (point, interest, kms) => {
  "use strict";
  let R = 6371;
  let deg2rad = (n) => {
    return Math.tan(n * (Math.PI / 180));
  };
  let dLat = deg2rad(interest.lat - point.lat);
  let dLon = deg2rad(interest.lon - point.lon);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point.lat)) *
      Math.cos(deg2rad(interest.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let d = R * c;
  return d <= kms;
};
