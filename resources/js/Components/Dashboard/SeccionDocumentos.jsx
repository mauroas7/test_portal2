export default function SeccionDocumentos() {
    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mis Documentos</h1>
                    <p className="font-semibold text-brandText">Gestión de certificados, facturación y archivos personales.</p>
                </div>
                <button className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30 transition-[transform,shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#00284A]">
                    <span className="material-symbols-outlined text-[24px] transition-transform group-hover:-translate-y-1">cloud_upload</span>
                    Subir Archivo
                </button>
            </div>

            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="group cursor-pointer rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="material-symbols-outlined text-[40px] text-blue-200 transition-colors group-hover:text-secondary">folder_special</span>
                        <span className="rounded-full bg-[#F4F7F9] border border-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500 shadow-inner">4 Archivos</span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary">Certificados</h3>
                    <p className="mt-1 text-xs font-semibold text-gray-500">Aptos físicos y justificativos.</p>
                </div>
                
                <div className="group cursor-pointer rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="material-symbols-outlined text-[40px] text-blue-200 transition-colors group-hover:text-secondary">receipt_long</span>
                        <span className="rounded-full bg-[#F4F7F9] border border-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500 shadow-inner">12 Archivos</span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary">Facturación</h3>
                    <p className="mt-1 text-xs font-semibold text-gray-500">Comprobantes y copagos.</p>
                </div>
                
                <div className="group cursor-pointer rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="material-symbols-outlined text-[40px] text-blue-200 transition-colors group-hover:text-secondary">cloud_done</span>
                        <span className="rounded-full bg-[#F4F7F9] border border-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500 shadow-inner">2 Archivos</span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary">Mis Subidas</h3>
                    <p className="mt-1 text-xs font-semibold text-gray-500">DNI, credenciales, externos.</p>
                </div>
            </div>

            <h2 className="mb-6 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Agregados Recientemente</h2>
            <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                <div className="hidden grid-cols-12 border-b border-gray-100 bg-[#F8F9FA] px-8 py-5 md:grid">
                    <span className="col-span-6 text-[10px] font-black uppercase tracking-widest text-brandText">Nombre del Archivo</span>
                    <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-brandText">Categoría</span>
                    <span className="col-span-3 text-right text-[10px] font-black uppercase tracking-widest text-brandText">Acción</span>
                </div>
                
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-50 px-6 py-4 transition-colors hover:bg-[#F4F7F9] md:grid-cols-12 md:px-8">
                        <div className="col-span-6 flex items-center gap-4 min-w-0">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-black text-primary truncate">Certificado_Apto_Fisico_2026.pdf</p>
                                <p className="mt-0.5 text-[10px] font-semibold text-gray-400">15 Abr 2026 • 245 KB</p>
                            </div>
                        </div>
                        <div className="col-span-3 hidden md:block">
                            <span className="rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Certificados</span>
                        </div>
                        <div className="col-span-3 flex justify-start md:justify-end">
                            <button className="flex items-center gap-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">
                                <span className="material-symbols-outlined text-[18px]">download</span> Descargar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-50 px-6 py-4 transition-colors hover:bg-[#F4F7F9] md:grid-cols-12 md:px-8">
                        <div className="col-span-6 flex items-center gap-4 min-w-0">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-black text-primary truncate">Factura_0001_00004492.pdf</p>
                                <p className="mt-0.5 text-[10px] font-semibold text-gray-400">10 Abr 2026 • 120 KB</p>
                            </div>
                        </div>
                        <div className="col-span-3 hidden md:block">
                            <span className="rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Facturación</span>
                        </div>
                        <div className="col-span-3 flex justify-start md:justify-end">
                            <button className="flex items-center gap-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">
                                <span className="material-symbols-outlined text-[18px]">download</span> Descargar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}