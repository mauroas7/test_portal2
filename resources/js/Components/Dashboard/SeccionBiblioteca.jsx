import { useState } from 'react';

export default function SeccionDocumentos() {
    // ESTADO MOCK: Simulamos la base de datos de documentos recibidos
    const [documentos] = useState([
        { 
            id: 1, 
            titulo: '#SalvaTuPiel - Aprendé el ABCDE de tus Lunares', 
            autor: 'La Roche-Posay', 
            categoria: 'Educación', 
            fecha: '12 May 2026', 
            tipo: 'video', // para el ícono
            peso: 'Enlace externo' 
        },
        { 
            id: 2, 
            titulo: 'Indicaciones Pre-quirúrgicas', 
            autor: 'Dr. Favaloro, René', 
            categoria: 'Cirugía', 
            fecha: '10 May 2026', 
            tipo: 'pdf', 
            peso: '1.2 MB' 
        },
        { 
            id: 3, 
            titulo: 'Dieta baja en sodio (Hipertensión)', 
            autor: 'Lic. Nutrición', 
            categoria: 'Nutrición', 
            fecha: '05 May 2026', 
            tipo: 'pdf', 
            peso: '845 KB' 
        },
        { 
            id: 4, 
            titulo: 'Folleto Informativo: Cuidados Post-Operatorios', 
            autor: 'Hospital Universitario', 
            categoria: 'Folleto', 
            fecha: '01 May 2026', 
            tipo: 'documento', 
            peso: '2.1 MB' 
        }
    ]);

    // Función auxiliar para renderizar el ícono correcto según el tipo de archivo
    const renderIcono = (tipo) => {
        switch (tipo) {
            case 'pdf':
                return <span className="material-symbols-outlined text-[20px] text-red-500">picture_as_pdf</span>;
            case 'video':
                return <span className="material-symbols-outlined text-[20px] text-blue-500">play_circle</span>;
            default:
                return <span className="material-symbols-outlined text-[20px] text-gray-500">description</span>;
        }
    };

    return (
        <div className="w-full animate-fade-in">
            
            {/* CABECERA */}
            <div className="mb-8 flex flex-col gap-2 border-b border-gray-100 pb-6">
                <h1 className="text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Biblioteca Médica</h1>
                <p className="font-semibold text-brandText">Documentos, indicaciones y material que tus médicos y/o consultorios han compartido contigo.</p>
            </div>

            {/* TABLA DE DOCUMENTOS */}
            <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                
                {/* Encabezados de Tabla (Ocultos en celular, visibles en desktop) */}
                <div className="hidden grid-cols-12 items-center border-b border-gray-100 bg-[#F8F9FA] px-8 py-5 md:grid gap-4">
                    <span className="col-span-5 text-[10px] font-black uppercase tracking-widest text-brandText">Título del Documento</span>
                    <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-brandText">Autor / Profesional</span>
                    <span className="col-span-2 text-[10px] font-black uppercase tracking-widest text-brandText">Categoría</span>
                    <span className="col-span-2 text-right text-[10px] font-black uppercase tracking-widest text-brandText pr-2">Acciones</span>
                </div>
                
                {/* Cuerpo de la Tabla */}
                <div className="flex flex-col">
                    {documentos.length > 0 ? (
                        documentos.map((doc) => (
                            <div key={doc.id} className="grid grid-cols-1 items-center gap-4 border-b border-gray-50 px-6 py-5 transition-colors hover:bg-[#F4F7F9] md:grid-cols-12 md:px-8">
                                
                                {/* Columna 1: Título e Ícono */}
                                <div className="col-span-5 flex items-center gap-4 min-w-0">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-inner ${doc.tipo === 'pdf' ? 'bg-red-50' : doc.tipo === 'video' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                                        {renderIcono(doc.tipo)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-primary truncate" title={doc.titulo}>{doc.titulo}</p>
                                        <p className="mt-0.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                                            {doc.fecha} <span className="mx-1">•</span> {doc.peso}
                                        </p>
                                    </div>
                                </div>

                                {/* Columna 2: Autor */}
                                <div className="col-span-3 hidden md:flex items-center gap-2 min-w-0">
                                    <span className="material-symbols-outlined text-[16px] text-gray-300 shrink-0">person</span>
                                    <p className="text-xs font-bold text-gray-500 truncate" title={doc.autor}>{doc.autor}</p>
                                </div>

                                {/* Columna 3: Categoría (Badges) */}
                                <div className="col-span-2 hidden md:block">
                                    <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gray-500 shadow-sm">
                                        {doc.categoria}
                                    </span>
                                </div>

                                {/* Columna 4: Acciones */}
                                <div className="col-span-2 flex justify-start md:justify-end">
                                    {doc.tipo === 'video' ? (
                                        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#00284A]">
                                            <span className="material-symbols-outlined text-[16px]">play_arrow</span> Ver Video
                                        </button>
                                    ) : (
                                        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary shadow-sm transition-colors hover:bg-[#F4F7F9] hover:border-secondary/30">
                                            <span className="material-symbols-outlined text-[16px]">download</span> Descargar
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">folder_off</span>
                            <h3 className="mb-2 text-xl font-black tracking-tight text-primary uppercase">No hay documentos</h3>
                            <p className="text-sm font-semibold text-gray-400">Aún no se han compartido documentos con vos.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}