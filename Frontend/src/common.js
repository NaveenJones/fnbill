const date = new Date();
export const current_month = date.toLocaleString("default", { month: "long" });
export const current_year = date.getFullYear().toString();


export const page_routes = [
    { url: "/", title: "Home", icon: "fa-solid fa-house", isSidebar: true },
    { url: "/custom-invoice", title: "Invoice", icon: "fa-solid fa-file-invoice", isSidebar: true },
    { url: "/custom-invoice/create", title: "Invoice -> Create", icon: "fa-solid fa-plus", isSidebar: false },
    { url: "/custom-invoice/update/", title: "Invoice -> Update", icon: "fa-solid fa-file-pen", isSidebar: false },
    { url: "/custom-invoice/history", title: "Invoice -> History", icon: "fa-solid fa-clock-rotate-left", isSidebar: false },
    { url: "/custom-invoice/generate/", title: "Invoice -> Generate", icon: "fa-solid fa-clock-rotate-left", isSidebar: false },
    { url: "/custom-invoice/payment-information/", title: "Invoice -> Payment Information", icon: "fa-solid fa-clock-rotate-left", isSidebar: false },
    { url: "/custom-invoice/paid-reciept/", title: "Invoice -> Payment Receipt", icon: "fa-solid fa-clock-rotate-left", isSidebar: false },
    { url: "/custom-invoice/information", title: "Invoice -> Infomation", icon: "fa-solid fa-building", isSidebar: false },

    { url: "/company-information", title: "Company Information", icon: "fa-solid fa-building", isSidebar: true },
    { url: "/company-information/create", title: "Company Information -> Create", icon: "fa-solid fa-plus", isSidebar: false },
    { url: "/company-information/update/", title: "Company Information -> Update", icon: "fa-solid fa-file-pen", isSidebar: false },

    { url: "/advertisement-information", title: "Advertisement Information", icon: "fa-solid fa-rectangle-ad", isSidebar: true },
    { url: "/advertisement-information/create", title: "Advertisement Information -> Create", icon: "fa-solid fa-plus", isSidebar: false },
    { url: "/advertisement-information/update/", title: "Advertisement Information -> Update", icon: "fa-solid fa-file-pen", isSidebar: false },
    
    { url: "/settings", title: "Settings", icon: "fa-solid fa-gear", isSidebar: true },
]

export const findPageByURL = {
    "/": "Home",
    // "/invoice": "Invoice",
    "/custom-invoice": "Invoice",
    "/custom-invoice/history": "Invoice ➔ History",
    "/custom-invoice/create": "Invoice ➔ Create",
    "^\/custom-invoice\/update\/\w+$": "Invoice ➔ Update",
    "^\/custom-invoice\/generate\/\w+$": "Invoice ➔ Generate",
    "^\/custom-invoice\/payment-information\/\w+$": "Invoice ➔ Payment Information",
    "^\/custom-invoice\/paid-reciept\/\w+$": "Invoice ➔ Payment Receipt",
    "^\/custom-invoice\/information\/\w+$": "Invoice ➔ Information",

    "/company-information": "Company Information",
    "/company-information/create": "Company Information ➔ Create",
    "^\/company-information\/update\/\w+$": "Company Information ➔ Update",

    "/advertisement-information": "Advertisement Information",
    "/advertisement-information/create": "Advertisement Information ➔ Create",
    "^\/advertisement-information\/update\/\w+$": "Advertisement Information ➔ Update",

    "/settings": "Settings"
}


export const findPageByName = {
    "Home": /^\/$/,
    "Invoice": /^\/custom-invoice$/,
    "Invoice ➔ Create": /^\/custom-invoice\/create$/,
    "Invoice ➔ Update": /^\/custom-invoice\/update\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    "Invoice ➔ History": /^\/custom-invoice\/history$/,
    
    "Invoice ➔ Generate": /^\/custom-invoice\/generate\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    "Invoice ➔ Payment Information": /^\/custom-invoice\/payment-information\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    "Invoice ➔ Payment Receipt": /^\/custom-invoice\/paid-reciept\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    "Invoice ➔ Information": /^\/custom-invoice\/information\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,

    "Company Information": /^\/company-information$/,
    "Company Information ➔ Create": /^\/company-information\/create$/,
    "Company Information ➔ Update": /^\/company-information\/update\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    
    "Advertisement Information": /^\/advertisement-information$/,
    "Advertisement Information ➔ Create": /^\/advertisement-information\/create$/,
    "Advertisement Information ➔ Update": /^\/advertisement-information\/update\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/,
    

    "Settings": /^\/settings$/,
}
