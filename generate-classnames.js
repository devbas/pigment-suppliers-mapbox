const supplier_level = ['low_supplier-', 'intermediate_supplier-', 'high_supplier-']
const specialized = ['is_specialized-', 'is_not_specialized-'] // Specialized No - Specialized Yes
const specialized_order = ['is_talens_specialized_order-', 'is_not_talens_specialized_order-'] // Specs yes - Specs no
const supplier_sops = ['is_main_supplier_sops-', 'is_not_main_supplier_sops-'] // Is Sops Supplier - Is Not Sops supplier
const manufacturer = ['is_manufacturer', 'is_not_manufacturer']

let classname = 'custom-marker-'
supplier_level.forEach((level) => {
  specialized.forEach((specialized_status) => {
    specialized_order.forEach((specialized_order_status) => {
      supplier_sops.forEach((supplier_status) => {
        manufacturer.forEach((manufacturer_status) => {
          console.log(`${classname}${level}${specialized_status}${specialized_order_status}${supplier_status}${manufacturer_status}`)
        })
      })
    })
  })
})