export default function generarUbicacionProducto(producto, distancia) {

  // Si puede llegar hoy, no mostramos ubicación.
  if (distancia != null && distancia <= 5) {
    return null;
  }

  const provincia = producto?.ubicacion?.provincia?.trim();

  if (provincia) {
    return provincia;
  }

  const ciudad = producto?.ubicacion?.ciudad?.trim();

  if (ciudad) {
    return ciudad;
  }

  return null;
}