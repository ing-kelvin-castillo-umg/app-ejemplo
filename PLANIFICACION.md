# Plan de Implementación: Sistema Web para Ferretería (Next.js / React)

Este documento contiene la planificación completa para el desarrollo por fases de la aplicación web de gestión para una **Ferretería**, incluyendo la arquitectura por capas, las estructuras de datos de cada módulo, el diseño UX/UI en tonos claros y la hoja de ruta iterativa por entregables.

---

## 🏬 Dominio del Negocio: Ferretería

La aplicación gestionará el catálogo de productos ferreteros (herramientas, construcción, plomería, electricidad, pintura), clientes, proveedores, punto de venta/facturación rápida y control de inventario.

---

## 🗂️ Estructura de Datos por Módulo

A continuación se definen los campos para las capas de **DTOs** y **Models** en los archivos JSON locales:

### 1. `products` (Productos e Inventario)
- **Campos DTO**: `prod_id`, `prod_code` (SKU), `prod_name`, `prod_category` (Herramientas, Plomería, etc.), `prod_price_sell`, `prod_price_buy`, `prod_stock`, `prod_min_stock`, `prod_unit` (Unidad, Metro, Kg, Caja), `prod_img`.
- **Regla de Negocio**: Si `prod_stock <= prod_min_stock`, se marca en amarillo/rojo como **Stock Bajo**.

### 2. `clients` (Clientes)
- **Campos DTO**: `cli_id`, `cli_nit` (RUT/Identificación), `cli_name`, `cli_phone`, `cli_email`, `cli_address`, `cli_type` (Final / Mayorista), `cli_status`.

### 3. `suppliers` (Proveedores)
- **Campos DTO**: `sup_id`, `sup_nit`, `sup_company_name`, `sup_contact_name`, `sup_phone`, `sup_email`, `sup_category` (Ej. Distribuidora de Pinturas, Cementos, Herramientas).

### 4. `sales` (Ventas y Punto de Venta)
- **Campos DTO**: `sale_id`, `sale_code` (Ej. `FAC-00123`), `sale_date`, `sale_client_id`, `sale_client_name`, `sale_items` (lista de `prod_id`, `qty`, `unit_price`, `subtotal`), `sale_total`, `sale_payment_method` (Efectivo, Tarjeta, Transferencia), `sale_seller_id`, `sale_status` (Completada / Anulada).

### 5. `users` (Usuarios y Control de Acceso)
- **Campos DTO**: `usr_id`, `usr_email`, `usr_pass`, `usr_name`, `usr_role` (`ADMIN` | `LIMITED`).

---

## 💡 Ideas Adicionales para el Módulo Privado (Ferretería)

1. **Punto de Venta Rápido (POS / Carretilla de Venta)**:
   - Permite seleccionar productos del catálogo, indicar la cantidad y asociarlo a un cliente para procesar la venta en 1 clic y actualizar el stock.
2. **Alerta de Stock Crítico y Reabastecimiento**:
   - Sección dedicada en el Dashboard que lista los productos cuyo inventario está por debajo del mínimo para facilitar pedidos a proveedores.
3. **Impresión / Vista de Ticket Ficticio**:
   - Al finalizar una venta, generar un modal responsivo con el formato de comprobante/factura listo para imprimir o guardar.
4. **Resumen de Ventas del Día**:
   - Tarjetas de KPIs (Total vendido hoy, número de transacciones, producto más vendido).

---

## 🏛️ Arquitectura por Capas (DTO -> Service -> Adapter -> Model -> UI)

```
[ JSON Mock / LocalStorage ]
         │ (Raw DTOs)
         ▼
[ Services ] ──(Puntos de entrada datos)──> [ Adapters / Mappers ]
                                                   │ (Domain Models)
                                                   ▼
                                         [ Context / Custom Hooks ]
                                                   │
                                                   ▼
                                         [ Vistas & Componentes UI ]
```

---

## 🗺️ Hoja de Ruta Iterativa por Fases (Desarrollo Gradual)

Recomendamos estructurar el trabajo en **5 Fases cortas y verificables**, comenzando por el MVP mínimo sugerido:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ FASE 1 (MVP Mínimo)                                                     │
│ Configuración base + Área Pública (Inicio, Nosotros, Productos,        │
│ Contacto) + Modal de Login Flotante + AuthContext (Roles Admin/Limitado)│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ FASE 2: Layout Privado + Dashboard KPIs + CRUD Clientes                 │
│ Sidebar responsivo, métricas principales de ferretería y gestión de     │
│ clientes con control de permisos por rol.                               │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ FASE 3: Proveedores + Catálogo Privado e Inventario                     │
│ CRUD Proveedores (Sólo Admin) y gestión de Stock/Precios de Productos.  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ FASE 4: Módulo de Ventas / POS + Historial                              │
│ Registrar nueva venta (POS), cálculo automático de total, descuenta    │
│ stock y visualizador de comprobantes/tickets.                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ FASE 5: Persistencia LocalStorage + Pulido UX/UI & Pruebas Finales      │
│ Botón "Restablecer Datos Demo", mensajes Toast de notificación,         │
│ revisión de diseño responsivo en móviles y tablets.                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Detalle de la FASE 1 (Paso Inicial Recomendado)

Para iniciar de inmediato con lo más relevante y visible:

1. **Creación del Proyecto**: Initialize Next.js (App Router, TypeScript, Tailwind CSS).
2. **Capas Base & Datos Iniciales**:
   - `dtos/` y `models/` para `User` y `Product`.
   - `data/users.json` y `data/products.json` con items de ferretería (ej: Martillo, Pintura, Taladro, Juego de Llaves, Tubo PVC).
   - `services/auth.service.ts` y `adapters/user.adapter.ts`.
3. **Diseño Público (Light Theme)**:
   - Header con navegación, logo "Ferretería Express" y botón "Iniciar Sesión".
   - `/`: Página de Inicio con Hero banner.
   - `/nosotros`: Información de la ferretería.
   - `/productos`: Catálogo público con buscador y filtro por categoría.
   - `/contacto`: Formulario con mensaje de confirmación.
4. **Modal de Login Flotante**:
   - Formulario modal con backdrop blur.
   - Botones rápidos demo `[Probar como Admin]` y `[Probar como Usuario Limitado]`.
   - Redirección al Dashboard tras autenticarse correctamente.

---

## 📑 Plan de Verificación de la Fase 1

- Probar la navegación entre las 4 páginas públicas.
- Filtrar productos en `/productos`.
- Abrir y cerrar el modal flotante de Login.
- Probar inicio de sesión con credenciales correctas e incorrectas.
- Verificar que el estado del usuario logueado (`Admin` o `Limitado`) se mantenga en el `AuthContext`.
