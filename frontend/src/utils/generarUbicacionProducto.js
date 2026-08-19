export default function generarUbicacionProducto(producto, distancia) {

    // Si está suficientemente cerca,
    // no mostramos ciudad/provincia.
    if (distancia != null && distancia <= 20) {
        return null;
    }

    const ciudad = producto?.ubicacion?.ciudad?.trim();
    const provincia = producto?.ubicacion?.provincia?.trim();

    if (ciudad && provincia) {
        return `${ciudad}, ${provincia}`;
    }

    if (ciudad) {
        return ciudad;
    }

    if (provincia) {
        return provincia;
    }

    return null;
}