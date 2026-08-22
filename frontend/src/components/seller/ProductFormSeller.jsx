import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { createProductService } from "../../services/productService";

function ProductFormSeller({ addProduct }) {

    const { user } = useAuth();

    const { id } = useParams();

    const navigate = useNavigate();


    // =====================================================
    // ESTADO DEL FORMULARIO
    // =====================================================

    const [formData, setFormData] = useState({

        nombre: "",

        descripcion: "",

        precio: "",

        categoria: "",

        stock: "",

        condicion: "nuevo",

        logistica: {

            modalidades: [],

            envio: {

                disponible: false,

                gratis: false,

                costoFijo: 0,

                costoCalculado: false

            },

            retiro: {

                disponible: false

            },

            tiempoEntrega: {

                tipo: "dias",

                minimo: 1,

                maximo: 3

            }

        },

        images: []

    });


    // =====================================================
    // CARGAR PRODUCTO SI ESTAMOS EDITANDO
    // =====================================================

    useEffect(() => {

        if (id) {

            cargarProducto();

        }

    }, [id]);


    const cargarProducto = async () => {

        try {

            const response = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/products`

            );


            const producto = response.data.find(

                p => p._id === id

            );


            if (!producto) return;


            setFormData({

                nombre:
                    producto.nombre || "",

                descripcion:
                    producto.descripcion || "",

                precio:
                    producto.precio ?? "",

                categoria:
                    producto.categoria || "",

                stock:
                    producto.stock ?? "",

                condicion:
                    producto.condicion || "nuevo",

                logistica: {

                    modalidades:
                        producto.logistica?.modalidades || [],

                    envio: {

                        disponible:
                            producto.logistica?.envio?.disponible || false,

                        gratis:
                            producto.logistica?.envio?.gratis || false,

                        costoFijo:
                            producto.logistica?.envio?.costoFijo ?? 0,

                        costoCalculado:
                            producto.logistica?.envio?.costoCalculado || false

                    },

                    retiro: {

                        disponible:
                            producto.logistica?.retiro?.disponible || false

                    },

                    tiempoEntrega: {

                        tipo:
                            producto.logistica?.tiempoEntrega?.tipo || "dias",

                        minimo:
                            producto.logistica?.tiempoEntrega?.minimo ?? 1,

                        maximo:
                            producto.logistica?.tiempoEntrega?.maximo ?? 3

                    }

                },

                images: []

            });

        }

        catch (error) {

            console.error(
                "Error cargando producto:",
                error
            );

        }

    };


    // =====================================================
    // CAMBIOS GENERALES
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };


    // =====================================================
    // MODALIDADES DE ENTREGA
    // =====================================================

    const toggleModalidad = (modalidad) => {

        setFormData(prev => {

            const actuales =
                prev.logistica.modalidades || [];


            const modalidades =
                actuales.includes(modalidad)

                    ? actuales.filter(
                        item => item !== modalidad
                    )

                    : [
                        ...actuales,
                        modalidad
                    ];


            return {

                ...prev,

                logistica: {

                    ...prev.logistica,

                    modalidades,

                    envio: {

                        ...prev.logistica.envio,

                        disponible:
                            modalidades.includes("envio")

                    },

                    retiro: {

                        ...prev.logistica.retiro,

                        disponible:
                            modalidades.includes("retiro")

                    }

                }

            };

        });

    };


    // =====================================================
    // CONFIGURACIÓN DEL ENVÍO
    // =====================================================

    const actualizarEnvio = (campo, valor) => {

        setFormData(prev => ({

            ...prev,

            logistica: {

                ...prev.logistica,

                envio: {

                    ...prev.logistica.envio,

                    [campo]: valor

                }

            }

        }));

    };


    // =====================================================
    // CONFIGURACIÓN DEL TIEMPO
    // =====================================================

    const actualizarTiempoEntrega = (campo, valor) => {

        setFormData(prev => ({

            ...prev,

            logistica: {

                ...prev.logistica,

                tiempoEntrega: {

                    ...prev.logistica.tiempoEntrega,

                    [campo]: valor

                }

            }

        }));

    };


    // =====================================================
    // IMÁGENES
    // =====================================================

    const handleImages = (e) => {

        const files =
            Array.from(e.target.files);


        const nuevasImagenes = [

            ...(formData.images || []),

            ...files

        ];


        if (nuevasImagenes.length > 5) {

            alert(
                "Solo podés subir un máximo de 5 imágenes."
            );

            return;

        }


        setFormData(prev => ({

            ...prev,

            images: nuevasImagenes

        }));

    };


    const eliminarImagen = (index) => {

        setFormData(prev => ({

            ...prev,

            images:
                prev.images.filter(
                    (_, i) => i !== index
                )

        }));

    };


    // =====================================================
    // ENVÍO DEL FORMULARIO
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // ---------------------------------------------
        // VALIDACIONES BÁSICAS
        // ---------------------------------------------

        if (

            !formData.nombre.trim() ||

            !formData.descripcion.trim() ||

            !formData.precio ||

            Number(formData.precio) <= 0 ||

            !formData.categoria

        ) {

            alert(
                "Completa correctamente todos los campos."
            );

            return;

        }


        // ---------------------------------------------
        // VALIDAR STOCK
        // ---------------------------------------------

        if (

            formData.stock === "" ||

            Number(formData.stock) < 0

        ) {

            alert(
                "Ingresá una cantidad de stock válida."
            );

            return;

        }


        // ---------------------------------------------
        // VALIDAR LOGÍSTICA
        // ---------------------------------------------

        const modalidades =
            formData.logistica.modalidades || [];


        if (modalidades.length === 0) {

            alert(
                "Seleccioná al menos una forma de entrega: envío a domicilio o retiro en persona."
            );

            return;

        }


        // ---------------------------------------------
        // VALIDAR COSTO DE ENVÍO
        // ---------------------------------------------

        if (

            formData.logistica.envio.disponible &&

            !formData.logistica.envio.gratis &&

            !formData.logistica.envio.costoCalculado &&

            (

                formData.logistica.envio.costoFijo === "" ||

                Number(
                    formData.logistica.envio.costoFijo
                ) < 0

            )

        ) {

            alert(
                "Indicá el costo fijo del envío, seleccioná envío gratis o elegí calcularlo según distancia."
            );

            return;

        }


        const token =
            await auth.currentUser.getIdToken();


        // =================================================
        // EDICIÓN
        // =================================================

        if (id) {

            await axios.put(

                `${import.meta.env.VITE_API_URL}/api/products/${id}`,

                {

                    nombre:
                        formData.nombre,

                    descripcion:
                        formData.descripcion,

                    precio:
                        Number(formData.precio),

                    categoria:
                        formData.categoria,

                    stock:
                        Number(formData.stock),

                    condicion:
                        formData.condicion,

                    logistica:
                        formData.logistica

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        }


        // =================================================
        // CREACIÓN
        // =================================================

        else {

            const productData =
                new FormData();


            productData.append(
                "nombre",
                formData.nombre
            );


            productData.append(
                "descripcion",
                formData.descripcion
            );


            productData.append(
                "precio",
                formData.precio
            );


            productData.append(
                "categoria",
                formData.categoria
            );


            productData.append(
                "stock",
                formData.stock
            );


            productData.append(
                "condicion",
                formData.condicion
            );


            // IMPORTANTE:
            // El backend recibe logística como JSON
            // dentro de FormData.

            productData.append(
                "logistica",
                JSON.stringify(
                    formData.logistica
                )
            );


            productData.append(

                "vendedor",

                JSON.stringify({

                    uid:
                        user.uid,

                    email:
                        user.email,

                    name:
                        user.displayName ||
                        "Usuario"

                })

            );


            formData.images?.forEach(
                (file) => {

                    productData.append(
                        "images",
                        file
                    );

                }
            );


            await createProductService(

                productData,

                token

            );

        }


        // =================================================
        // FINALIZAR
        // =================================================

        navigate("/micuenta");


        setFormData({

            nombre: "",

            descripcion: "",

            precio: "",

            categoria: "",

            stock: "",

            condicion: "nuevo",

            logistica: {

                modalidades: [],

                envio: {

                    disponible: false,

                    gratis: false,

                    costoFijo: 0,

                    costoCalculado: false

                },

                retiro: {

                    disponible: false

                },

                tiempoEntrega: {

                    tipo: "dias",

                    minimo: 1,

                    maximo: 3

                }

            },

            images: []

        });

    };


    // =====================================================
    // RENDER
    // =====================================================

    const envioSeleccionado =
        formData.logistica.modalidades.includes(
            "envio"
        );


    const retiroSeleccionado =
        formData.logistica.modalidades.includes(
            "retiro"
        );


    return (

        <form
            onSubmit={handleSubmit}
            style={styles.form}
        >

            <h2 style={styles.title}>

                {id
                    ? "✏️ Editar producto"
                    : "🛍️ Crear producto"
                }

            </h2>


            {/* ==========================================
                INFORMACIÓN DEL PRODUCTO
            ========================================== */}

            <input
                style={styles.input}
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                value={formData.nombre}
                onChange={handleChange}
            />


            <textarea
                style={{
                    ...styles.input,
                    minHeight: "100px",
                    resize: "vertical"
                }}
                name="descripcion"
                placeholder="Descripción detallada del producto"
                value={formData.descripcion}
                onChange={handleChange}
            />


            <input
                style={styles.input}
                type="number"
                name="precio"
                placeholder="Precio"
                min="0"
                value={formData.precio}
                onChange={handleChange}
            />


            <input
                style={styles.input}
                type="number"
                name="stock"
                placeholder="Cantidad disponible"
                min="0"
                value={formData.stock}
                onChange={handleChange}
            />


            {/* ==========================================
                CATEGORÍA
            ========================================== */}

            <select
                style={styles.input}
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
            >

                <option value="">
                    Seleccionar categoría
                </option>

                <option value="Indumentaria">
                    👕 Indumentaria
                </option>

                <option value="Electro">
                    📺 Electro
                </option>

                <option value="Servicios">
                    🔧 Servicios
                </option>

                <option value="Varios">
                    📦 Varios
                </option>

            </select>


            {/* ==========================================
                CONDICIÓN
            ========================================== */}

            <select
                style={styles.input}
                name="condicion"
                value={formData.condicion}
                onChange={handleChange}
            >

                <option value="nuevo">
                    ✨ Producto nuevo
                </option>

                <option value="usado">
                    ♻️ Producto usado
                </option>

            </select>


            {/* ==========================================
                LOGÍSTICA
            ========================================== */}

            <div style={styles.section}>

                <h3 style={styles.sectionTitle}>

    🚚 Opciones de entrega

</h3>

<p style={styles.helpText}>

    Elegí cómo podrá recibir el producto el comprador.
    Podés seleccionar una opción o ambas.

</p>

<p style={styles.helpText}>

    💡 <strong>
        Importante:
    </strong>{" "}

    Elegir "Envío a domicilio" no significa que
    debas utilizar un correo específico ni que
    necesites obligatoriamente un número de
    seguimiento.

</p>


                <div style={styles.deliveryGrid}>

    {/* ==========================================
        ENVÍO A DOMICILIO
    ========================================== */}

    <button
        type="button"
        onClick={() =>
            toggleModalidad("envio")
        }
        aria-pressed={envioSeleccionado}
        style={{
            ...styles.deliveryOption,
            ...(envioSeleccionado
                ? styles.deliverySelected
                : {})
        }}
    >

        <span style={styles.deliveryIcon}>
            🚚
        </span>

        <strong>
            Envío a domicilio
        </strong>

        <small style={styles.deliveryDescription}>

            El vendedor envía el producto hasta
            el domicilio indicado por el comprador.

        </small>

        <small style={styles.deliveryExplanation}>

            📌 Podés ofrecer envío gratis, cobrar
            un precio fijo o permitir que SYPSY
            calcule el costo según la distancia.

        </small>

        <small style={styles.deliveryExplanation}>

            📦 El envío puede realizarse mediante
            correo, transporte, mensajería o de
            forma particular. No es obligatorio
            contar con número de seguimiento.

        </small>

        {envioSeleccionado && (

            <span style={styles.selectedBadge}>

                ✓ Seleccionado

            </span>

        )}

    </button>


    {/* ==========================================
        RETIRO EN PERSONA
    ========================================== */}

    <button
        type="button"
        onClick={() =>
            toggleModalidad("retiro")
        }
        aria-pressed={retiroSeleccionado}
        style={{
            ...styles.deliveryOption,
            ...(retiroSeleccionado
                ? styles.deliverySelected
                : {})
        }}
    >

        <span style={styles.deliveryIcon}>
            📦
        </span>

        <strong>
            Retiro en persona
        </strong>

        <small style={styles.deliveryDescription}>

            El comprador retira el producto
            personalmente.

        </small>

        <small style={styles.deliveryExplanation}>

            📍 El vendedor indicará el punto o zona
            donde se realizará el retiro.

        </small>

        <small style={styles.deliveryExplanation}>

            🤝 No se utiliza envío, transportista
            ni número de seguimiento.

        </small>

        {retiroSeleccionado && (

            <span style={styles.selectedBadge}>

                ✓ Seleccionado

            </span>

        )}

    </button>

</div>


                {/* ======================================
                    CONFIGURACIÓN DEL ENVÍO
                ====================================== */}

                {
                    envioSeleccionado && (

                        <div style={styles.subSection}>

                            <h4>
                              🚚 ¿Cómo querés cobrar el envío?
                            </h4>

                              <p style={styles.helpText}>

                                Elegí una de las siguientes alternativas
                                para definir quién paga y cómo se calcula
                                el costo del envío.

                              </p>


                            <label style={styles.checkboxRow}>

                                <input
                                    type="checkbox"
                                    checked={
                                        formData.logistica.envio.gratis
                                    }
                                    onChange={(e) =>
                                        actualizarEnvio(
                                            "gratis",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    🎁 Ofrecer envío gratis
                                </span>

                            </label>

                            {formData.logistica.envio.gratis && (

                              <p style={styles.infoText}>

                                🎁 Vos asumís el costo del envío.
                                El comprador no pagará un importe adicional
                                por recibir el producto.

                              </p>

                            )}


                            {
                                !formData.logistica.envio.gratis && (

                                    <>

                                        <label style={styles.checkboxRow}>

                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.logistica.envio.costoCalculado
                                                }
                                                onChange={(e) =>
                                                    actualizarEnvio(
                                                        "costoCalculado",
                                                        e.target.checked
                                                    )
                                                }
                                            />

                                            <span>
                                                📍 Calcular costo según distancia
                                            </span>

                                        </label>

                                        {formData.logistica.envio.costoCalculado && (

                                          <p style={styles.infoText}>
                                    
                                            📍 El costo se calculará considerando
                                            la distancia entre la ubicación del vendedor
                                            y la dirección de entrega del comprador.
                                    
                                          </p>

                                        )}


                                        {
                                            !formData.logistica.envio.costoCalculado && (

                                                <div>

                                                    <label style={styles.label}>

                                                        💰 Costo fijo del envío

                                                    </label>

                                                    <input
                                                        style={styles.input}
                                                        type="number"
                                                        min="0"
                                                        placeholder="Ej: 3500"
                                                        value={
                                                            formData.logistica.envio.costoFijo
                                                        }
                                                        onChange={(e) =>
                                                            actualizarEnvio(
                                                                "costoFijo",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <small
                                                      style={styles.helpText}
                                                    >

                                                      💰 Este será el importe que pagará el
                                                      comprador por el envío, independientemente
                                                      de la distancia.

                                                    </small>

                                                </div>

                                            )

                                        }

                                    </>

                                )

                            }


                            {
                                formData.logistica.envio.gratis && (

                                    <p style={styles.successText}>

                                        🎁 El vendedor ofrece envío gratis.

                                    </p>

                                )

                            }


                            {
                                formData.logistica.envio.costoCalculado && (

                                    <p style={styles.infoText}>

                                        📍 SYPSY calculará el costo del envío
                                        según la distancia entre el vendedor
                                        y el comprador.

                                    </p>

                                )

                            }

                        </div>

                    )

                }


                {/* ======================================
                    TIEMPO DE ENTREGA
                ====================================== */}

                {
                    envioSeleccionado && (

                        <div style={styles.subSection}>

                            <h4>
                                ⏱️ Tiempo estimado de entrega
                            </h4>


                            <select
                                style={styles.input}
                                value={
                                    formData.logistica.tiempoEntrega.tipo
                                }
                                onChange={(e) =>
                                    actualizarTiempoEntrega(
                                        "tipo",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="hoy">
                                    ⚡ Hoy
                                </option>

                                <option value="manana">
                                    📅 Mañana
                                </option>

                                <option value="dias">
                                    📦 Entre varios días
                                </option>

                                <option value="personalizado">
                                    🕐 Tiempo personalizado
                                </option>

                            </select>


                            {
                                formData.logistica.tiempoEntrega.tipo ===
                                "dias" && (

                                    <div style={styles.timeGrid}>

                                        <div>

                                            <label style={styles.label}>
                                                Mínimo
                                            </label>

                                            <input
                                                style={styles.input}
                                                type="number"
                                                min="1"
                                                value={
                                                    formData.logistica.tiempoEntrega.minimo
                                                }
                                                onChange={(e) =>
                                                    actualizarTiempoEntrega(
                                                        "minimo",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />

                                        </div>


                                        <div>

                                            <label style={styles.label}>
                                                Máximo
                                            </label>

                                            <input
                                                style={styles.input}
                                                type="number"
                                                min="1"
                                                value={
                                                    formData.logistica.tiempoEntrega.maximo
                                                }
                                                onChange={(e) =>
                                                    actualizarTiempoEntrega(
                                                        "maximo",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>

                                )

                            }

                        </div>

                    )

                }


                {/* ======================================
                    RETIRO
                ====================================== */}

                {
                    retiroSeleccionado && (

                        <div style={styles.retiroInfo}>

                            📦 <strong>
                                Retiro en persona habilitado
                            </strong>

                            <p>

                                El comprador podrá elegir retirar
                                personalmente el producto.

                                <br />

                                SYPSY utilizará la ubicación registrada
                                del vendedor para mostrar la zona
                                de retiro.

                            </p>

                        </div>

                    )

                }

            </div>


            {/* ==========================================
                IMÁGENES
            ========================================== */}

            <div style={styles.section}>

                <h3 style={styles.sectionTitle}>

                    📸 Imágenes del producto

                </h3>


                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImages}
                />


                <p style={styles.helpText}>

                    Máximo permitido: 5 imágenes.

                </p>


                <div className="preview-grid">

                    {formData.images?.map(
                        (file, index) => (

                            <div
                                key={index}
                                className="preview-card"
                            >

                                <button
                                    type="button"
                                    className="remove-image"
                                    onClick={() =>
                                        eliminarImagen(index)
                                    }
                                >

                                    ✕

                                </button>


                                <img
                                    src={
                                        URL.createObjectURL(file)
                                    }
                                    alt={`preview-${index}`}
                                    className="preview-image"
                                />

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* ==========================================
                BOTÓN
            ========================================== */}

            <button
                type="submit"
                style={styles.button}
            >

                {id
                    ? "💾 Guardar cambios"
                    : "🚀 Publicar producto"
                }

            </button>

        </form>

    );

}


// =====================================================
// ESTILOS
// =====================================================

const styles = {

    form: {

        background:
            "var(--bg)",

        border:
            "1px solid var(--border)",

        borderRadius:
            "16px",

        padding:
            "25px",

        marginBottom:
            "30px",

        display:
            "flex",

        flexDirection:
            "column",

        gap:
            "15px",

        boxShadow:
            "var(--shadow)"

    },


    title: {

        textAlign:
            "left",

        marginBottom:
            "5px"

    },


    input: {

        padding:
            "14px",

        borderRadius:
            "10px",

        border:
            "1px solid var(--border)",

        fontSize:
            "16px",

        outline:
            "none",

        width:
            "100%",

        boxSizing:
            "border-box"

    },


    button: {

        background:
            "var(--accent)",

        color:
            "white",

        padding:
            "14px",

        borderRadius:
            "10px",

        fontSize:
            "16px",

        fontWeight:
            "bold",

        border:
            "none",

        cursor:
            "pointer"

    },


    section: {

        border:
            "1px solid var(--border)",

        borderRadius:
            "14px",

        padding:
            "18px",

        marginTop:
            "5px"

    },


    sectionTitle: {

        marginTop:
            "0",

        marginBottom:
            "5px"

    },


    helpText: {

        fontSize:
            "13px",

        color:
            "#64748b",

        lineHeight:
            "1.5"

    },


    deliveryGrid: {

        display:
            "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

        gap:
            "12px",

        marginTop:
            "15px"

    },


    deliveryOption: {

    border:
        "2px solid var(--border)",

    background:
        "var(--bg)",

    borderRadius:
        "12px",

    padding:
        "18px",

    display:
        "flex",

    flexDirection:
        "column",

    gap:
        "9px",

    cursor:
        "pointer",

    textAlign:
        "left",

    transition:
        "all 0.2s ease",

    position:
        "relative",

    width:
        "100%",

    boxSizing:
        "border-box"

},


    deliverySelected: {

    border:
        "2px solid var(--accent)",

    background:
        "rgba(59,130,246,0.06)",

    boxShadow:
        "0 0 0 3px rgba(59,130,246,0.12)"

},


    deliveryIcon: {

        fontSize:
            "28px"

    },

    deliveryDescription: {

    fontSize:
        "14px",

    lineHeight:
        "1.5",

    color:
        "var(--text)"

},

deliveryExplanation: {

    fontSize:
        "13px",

    lineHeight:
        "1.5",

    color:
        "#64748b"

},

selectedBadge: {

    alignSelf:
        "flex-start",

    marginTop:
        "4px",

    padding:
        "5px 9px",

    borderRadius:
        "999px",

    background:
        "var(--accent)",

    color:
        "white",

    fontSize:
        "12px",

    fontWeight:
        "700"

},


    subSection: {

        marginTop:
            "18px",

        padding:
            "15px",

        borderRadius:
            "10px",

        background:
            "rgba(100,116,139,0.06)"

    },


    label: {

        display:
            "block",

        fontWeight:
            "600",

        marginBottom:
            "7px"

    },


    checkboxRow: {

        display:
            "flex",

        alignItems:
            "center",

        gap:
            "10px",

        cursor:
            "pointer",

        marginBottom:
            "12px"

    },


    successText: {

        color:
            "#15803d",

        fontSize:
            "14px",

        fontWeight:
            "600"

    },


    infoText: {

        color:
            "#2563eb",

        fontSize:
            "14px",

        lineHeight:
            "1.5"

    },


    timeGrid: {

        display:
            "grid",

        gridTemplateColumns:
            "1fr 1fr",

        gap:
            "12px"

    },


    retiroInfo: {

        marginTop:
            "18px",

        padding:
            "15px",

        borderRadius:
            "10px",

        background:
            "rgba(59,130,246,0.08)"

    }

};


export default ProductFormSeller;