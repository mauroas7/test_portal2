import { useState, useMemo } from 'react';

export default function SeccionCartilla({ especialidadesDb, medicosDb, setIsModalOpen, setNuevoTurno, nuevoTurno, setModalStep }) {
    const [subTabCartilla, setSubTabCartilla] = useState('especialidades');
    const [cartillaEspecialidadFilter, setCartillaEspecialidadFilter] = useState('');
    
    // --- NUEVO ESTADO: Controla si estamos viendo la grilla o el detalle de una especialidad ---
    const [especialidadActiva, setEspecialidadActiva] = useState(null);

    // Memoizamos los médicos para la vista de detalle, filtrando solo los que pertenecen a la especialidad
    const medicosDeEspecialidad = useMemo(() => {
        if (!especialidadActiva) return [];
        return medicosDb.filter(m => m.especialidad_id === especialidadActiva.id);
    }, [especialidadActiva, medicosDb]);

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Cartilla Médica</h1>
                    <p className="font-semibold text-brandText">Directorio de profesionales y especialidades del Hospital.</p>
                </div>
            </div>

            <div className="mb-8 flex p-1.5 bg-white shadow-sm w-fit rounded-xl border border-gray-100">
                <button 
                    onClick={() => {
                        setSubTabCartilla('especialidades');
                        setEspecialidadActiva(null); // Reseteamos la vista de detalle si cambia de tab
                    }} 
                    className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabCartilla === 'especialidades' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}
                >
                    Especialidades
                </button>
                <button 
                    onClick={() => setSubTabCartilla('profesionales')} 
                    className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabCartilla === 'profesionales' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}
                >
                    Profesionales A-Z
                </button>
            </div>

            {/* --- TAB 1: ESPECIALIDADES --- */}
            {subTabCartilla === 'especialidades' && (
                <div className="animate-fade-in">
                    {!especialidadActiva ? (
                        // VISTA A: GRILLA DE TARJETAS
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
                            {especialidadesDb.map(esp => (
                                <div 
                                    key={esp.id} 
                                    onClick={() => setEspecialidadActiva(esp)} // Activamos la vista de detalle
                                    className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[transform,shadow,border-color] hover:-translate-y-1 hover:border-secondary/30 hover:shadow-md"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F7F9] shadow-inner text-primary transition-transform group-hover:scale-110">
                                            <span className="material-symbols-outlined text-[32px]">medical_services</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-lg font-black uppercase tracking-tight text-primary transition-colors group-hover:text-secondary">{esp.nombre}</h3>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4 opacity-0 transition-opacity group-hover:opacity-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Ver detalles</span>
                                        <span className="material-symbols-outlined text-secondary">arrow_forward</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // VISTA B: DETALLE DE LA ESPECIALIDAD (Drill-down)
                        <div className="animate-fade-in flex flex-col gap-8">
                            
                            {/* Botón de retroceso */}
                            <button 
                                onClick={() => setEspecialidadActiva(null)} 
                                className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:bg-[#F4F7F9] hover:text-primary shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span> 
                                Volver a especialidades
                            </button>

                            {/* Cabecera de la Especialidad */}
                            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#F4F7F9] shadow-inner text-primary">
                                    <span className="material-symbols-outlined text-[48px]">medical_services</span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-primary mb-3">
                                        {especialidadActiva.nombre}
                                    </h2>
                                    <div className="prose prose-sm text-brandText max-w-none">
                                        {/* Acá podrías usar especialidadActiva.descripcion_larga si la tenés en la base de datos. 
                                            Por ahora usamos la descripción estándar o un texto de relleno. */}
                                        <p className="font-medium leading-relaxed">
                                            {especialidadActiva.descripcion || 'Esta es el área encargada de brindar atención integral para esta rama de la medicina. Contamos con tecnología de última generación y un equipo de profesionales altamente capacitados.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Listado de Médicos Exclusivos */}
                            <div>
                                <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
                                    <span className="material-symbols-outlined text-secondary text-[20px]">groups</span>
                                    Equipo Médico
                                </h3>
                                
                                {medicosDeEspecialidad.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {medicosDeEspecialidad.map(prof => (
                                            <div key={prof.id} className="flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[shadow] hover:shadow-md">
                                                <div className="flex items-center gap-5 mb-5">
                                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-gray-300">
                                                        <span className="material-symbols-outlined text-[32px]">person</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-0.5 text-base font-black tracking-tight text-primary uppercase leading-tight">
                                                            Dr/a. {prof.apellido}, <br/> {prof.nombre}
                                                        </h3>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary mt-1">Sede Central</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-50">
                                                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white shadow-sm px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary transition-[background-color,border-color,shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#F4F7F9] hover:shadow-md">
                                                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                        Perfil
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setNuevoTurno({ ...nuevoTurno, especialidad_id: prof.especialidad_id, especialidad: especialidadActiva.nombre, medico_id: prof.id, medico: `${prof.apellido}, ${prof.nombre}` });
                                                            setModalStep(3);
                                                            setIsModalOpen(true);
                                                        }} 
                                                        className="group flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30 transition-[background-color,color,shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#00284A] hover:text-[#C7A36E] hover:shadow-xl hover:shadow-[#00284A]/40"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5">calendar_add_on</span>
                                                        Turno
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-[2rem] border border-dashed border-gray-200 bg-[#F4F7F9] p-10 text-center">
                                        <p className="text-sm font-semibold text-gray-400">Actualmente no hay profesionales cargados en esta área.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- TAB 2: PROFESIONALES A-Z --- */}
            {subTabCartilla === 'profesionales' && (
                <div className="animate-fade-in">
                    <div className="mb-8 flex flex-col md:flex-row gap-4 rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-widest text-gray-400">Filtrar por Especialidad</label>
                            <select 
                                value={cartillaEspecialidadFilter}
                                onChange={(e) => setCartillaEspecialidadFilter(e.target.value)}
                                className="w-full rounded-xl border border-gray-100 bg-[#F4F7F9] py-3 pl-4 pr-10 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer transition-colors"
                            >
                                <option value="">Todas las especialidades</option>
                                {especialidadesDb.map(esp => (
                                    <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {medicosDb.filter(prof => !cartillaEspecialidadFilter || prof.especialidad_id.toString() === cartillaEspecialidadFilter).map(prof => {
                            const espNombre = especialidadesDb.find(e => e.id === prof.especialidad_id)?.nombre || 'Especialista';
                            return (
                                <div key={prof.id} className="flex flex-col sm:flex-row gap-6 overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[shadow] hover:shadow-md">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-gray-300">
                                        <span className="material-symbols-outlined text-[36px]">person</span>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h3 className="mb-0.5 text-lg font-black tracking-tight text-primary uppercase">Dr/a. {prof.apellido}, {prof.nombre}</h3>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">{espNombre}</p>
                                            <p className="text-sm font-semibold text-gray-500">Sede Central</p>
                                        </div>
                                        <div className="mt-5 flex gap-3">
                                            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white shadow-sm px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary transition-[background-color,border-color,shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#F4F7F9] hover:shadow-md text-center">
                                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                Ver Perfil
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setNuevoTurno({ ...nuevoTurno, especialidad_id: prof.especialidad_id, especialidad: espNombre, medico_id: prof.id, medico: `${prof.apellido}, ${prof.nombre}` });
                                                    setModalStep(3);
                                                    setIsModalOpen(true);
                                                }} 
                                                className="group flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30 transition-[background-color,color,shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#00284A] hover:text-[#C7A36E] hover:shadow-xl hover:shadow-[#00284A]/40"
                                            >
                                                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5">calendar_add_on</span>
                                                Sacar Turno
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}