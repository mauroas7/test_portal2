import { useState, useMemo } from 'react';

export default function SeccionCartilla({ especialidadesDb, medicosDb, setIsModalOpen, setNuevoTurno, nuevoTurno, setModalStep }) {
    const [subTabCartilla, setSubTabCartilla] = useState('especialidades');
    const [especialidadActiva, setEspecialidadActiva] = useState(null);
    const [cartillaEspecialidadFilter, setCartillaEspecialidadFilter] = useState('');
    const [misMedicosIds, setMisMedicosIds] = useState([1]); 

    // --- ESTADOS PARA EL SLIDE-OVER ---
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [medicoParaPerfil, setMedicoParaPerfil] = useState(null);

    const toggleEquipo = (e, id) => {
        e.stopPropagation();
        setMisMedicosIds(prev => prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]);
    };

    const abrirPerfil = (prof) => {
        setMedicoParaPerfil(prof);
        setIsPanelOpen(true);
    };

    const equipoMedico = useMemo(() => medicosDb.filter(m => misMedicosIds.includes(m.id)), [misMedicosIds, medicosDb]);
    const medicosDeEspecialidadActiva = useMemo(() => {
        if (!especialidadActiva) return [];
        return medicosDb.filter(m => m.especialidad_id === especialidadActiva.id);
    }, [especialidadActiva, medicosDb]);

    // COMPONENTE UNIVERSAL: Tarjeta de Profesional
    const TarjetaMedico = ({ prof, espNombreForzado }) => {
        const esMiEquipo = misMedicosIds.includes(prof.id);
        const espNombre = espNombreForzado || especialidadesDb.find(e => e.id === prof.especialidad_id)?.nombre || 'Especialista';
        
        return (
            <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md h-full">
                <button 
                    onClick={(e) => toggleEquipo(e, prof.id)}
                    className={`absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors ${esMiEquipo ? 'bg-blue-50 text-primary' : 'text-gray-300 hover:bg-gray-50 hover:text-gray-400'}`}
                >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: esMiEquipo ? "'FILL' 1" : "'FILL' 0" }}>
                        {esMiEquipo ? 'bookmark' : 'bookmark_add'}
                    </span>
                </button>

                <div className="flex items-center gap-5 mb-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-gray-300">
                        <span className="material-symbols-outlined text-[32px]">person</span>
                    </div>
                    <div className="pr-6">
                        <h3 className="text-base font-black tracking-tight text-primary uppercase leading-tight">Dr/a. {prof.apellido}, {prof.nombre}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary mt-1">{espNombre}</p>
                    </div>
                </div>

                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-50">
                    <button 
                        onClick={() => abrirPerfil(prof)} // CONEXIÓN AL PANEL
                        className="flex-1 rounded-full border border-gray-200 bg-white py-2.5 text-[10px] font-black uppercase tracking-widest text-primary transition-all hover:bg-[#F4F7F9] shadow-sm"
                    >
                        Perfil
                    </button>
                    <button 
                        onClick={() => {
                            setNuevoTurno({ ...nuevoTurno, medico_id: prof.id, medico: `${prof.apellido}, ${prof.nombre}`, especialidad: espNombre, especialidad_id: prof.especialidad_id });
                            setModalStep(3); setIsModalOpen(true);
                        }} 
                        className="group flex-1 flex items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-[#00284A] hover:text-[#C7A36E]"
                    >
                        <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                        Turno
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="relative">
            <div className="animate-fade-in">
                <div className="mb-8 border-b border-gray-100 pb-6">
                    <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Cartilla Médica</h1>
                    <p className="font-semibold text-brandText">Directorio de profesionales y especialidades del Hospital.</p>
                </div>

                <div className="mb-8 flex p-1.5 bg-white shadow-sm w-fit rounded-xl border border-gray-100">
                    {['especialidades', 'profesionales', 'equipo'].map((t) => (
                        <button 
                            key={t}
                            onClick={() => { setSubTabCartilla(t); setEspecialidadActiva(null); }}
                            className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabCartilla === t ? 'bg-[#F4F7F9] text-primary shadow-inner' : 'text-gray-400 hover:text-brandText'}`}
                        >
                            {t === 'especialidades' ? 'Especialidades' : t === 'profesionales' ? 'Profesionales' : 'Mis Médicos'}
                        </button>
                    ))}
                </div>

                {/* --- RENDERIZADO DE TABS (Igual que antes) --- */}
                {subTabCartilla === 'especialidades' && (
                    <div className="animate-fade-in">
                        {!especialidadActiva ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {especialidadesDb.map(esp => (
                                    <div key={esp.id} onClick={() => setEspecialidadActiva(esp)} className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-[transform,shadow,border-color] hover:-translate-y-1 hover:border-secondary/30 hover:shadow-md">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F7F9] shadow-inner text-primary transition-transform group-hover:scale-110">
                                                <span className="material-symbols-outlined text-[32px]">medical_services</span>
                                            </div>
                                        </div>
                                        <h3 className="mb-1 text-lg font-black uppercase tracking-tight text-primary transition-colors group-hover:text-secondary">{esp.nombre}</h3>
                                        <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Ver detalles</span>
                                            <span className="material-symbols-outlined text-secondary">arrow_forward</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="animate-fade-in flex flex-col gap-8">
                                <button onClick={() => setEspecialidadActiva(null)} className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:bg-[#F4F7F9] hover:text-primary shadow-sm">
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span> Volver a especialidades
                                </button>
                                <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#F4F7F9] shadow-inner text-primary">
                                        <span className="material-symbols-outlined text-[48px]">medical_services</span>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-black uppercase tracking-tight text-primary mb-3">{especialidadActiva.nombre}</h2>
                                        <p className="text-sm font-medium leading-relaxed text-brandText">{especialidadActiva.descripcion}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {medicosDeEspecialidadActiva.map(prof => <TarjetaMedico key={prof.id} prof={prof} espNombreForzado={especialidadActiva.nombre} />)}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {subTabCartilla === 'profesionales' && (
                    <div className="animate-fade-in">
                        <div className="mb-8 flex flex-col md:flex-row gap-4 rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
                            <div className="w-full md:w-1/2 lg:w-1/3">
                                <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-widest text-gray-400">Filtrar por Especialidad</label>
                                <select value={cartillaEspecialidadFilter} onChange={(e) => setCartillaEspecialidadFilter(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F4F7F9] py-3 pl-4 pr-10 text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer transition-colors">
                                    <option value="">Todas las especialidades</option>
                                    {especialidadesDb.map(esp => <option key={esp.id} value={esp.id}>{esp.nombre}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {medicosDb.filter(prof => !cartillaEspecialidadFilter || prof.especialidad_id.toString() === cartillaEspecialidadFilter).map(prof => <TarjetaMedico key={prof.id} prof={prof} />)}
                        </div>
                    </div>
                )}

                {subTabCartilla === 'equipo' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {equipoMedico.map(prof => <TarjetaMedico key={prof.id} prof={prof} />)}
                    </div>
                )}
            </div>

            {/* --- COMPONENTE SLIDE-OVER (PANEL PERFIL) --- */}
            <PanelPerfilMedico 
                isOpen={isPanelOpen} 
                onClose={() => setIsPanelOpen(false)} 
                medico={medicoParaPerfil}
                especialidades={especialidadesDb}
                onReservar={() => {
                    setIsPanelOpen(false);
                    const esp = especialidadesDb.find(e => e.id === medicoParaPerfil.especialidad_id);
                    setNuevoTurno({ ...nuevoTurno, medico_id: medicoParaPerfil.id, medico: `${medicoParaPerfil.apellido}, ${medicoParaPerfil.nombre}`, especialidad: esp?.nombre, especialidad_id: medicoParaPerfil.especialidad_id });
                    setModalStep(3);
                    setIsModalOpen(true);
                }}
            />
        </div>
    );
}

// COMPONENTE PANEL LATERAL
function PanelPerfilMedico({ isOpen, onClose, medico, especialidades, onReservar }) {
    if (!medico) return null;
    const especialidad = especialidades.find(e => e.id === medico.especialidad_id)?.nombre;

    return (
        <>
            {/* Backdrop (Fondo oscuro) */}
            <div 
                className={`fixed inset-0 z-[150] bg-primary/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={onClose}
            />

            {/* Panel */}
            <div className={`fixed top-0 right-0 z-[160] h-full w-full sm:w-[480px] bg-[#F4F7F9] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header del Panel */}
                <div className="flex items-center justify-between bg-white px-8 py-6 border-b border-gray-100 shadow-sm">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Perfil Profesional</h2>
                    <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Bloque 1: Identidad (CABECERA) */}
                    <div className="bg-white px-8 pb-10 pt-4 text-center border-b border-gray-100">
                        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-gray-300">
                            <span className="material-symbols-outlined text-[64px]">person</span>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-primary">Dr/a. {medico.apellido}, {medico.nombre}</h3>
                        <p className="mt-1 text-sm font-black uppercase tracking-widest text-secondary">{especialidad}</p>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-100 px-4 py-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Matrícula:</span>
                            <span className="text-[11px] font-black text-primary">MP 44.912 / MN 120.334</span>
                        </div>
                    </div>

                    {/* Bloque 2: Foco Clínico */}
                    <div className="p-8 space-y-8">
                        <section>
                            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <span className="material-symbols-outlined text-secondary text-lg">psychiatry</span>
                                Especialidad y Enfoque
                            </h4>
                            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm border border-gray-100">
                                <p className="text-sm font-medium leading-relaxed text-brandText">
                                    Profesional con amplia trayectoria en el diagnóstico y tratamiento integral de patologías relacionadas a la <strong>{especialidad}</strong>. 
                                    Su enfoque se centra en la medicina preventiva y el seguimiento personalizado de cada paciente.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                <span className="material-symbols-outlined text-secondary text-lg">clinical_notes</span>
                                Áreas de Atención
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {['Consulta General', 'Control Periódico', 'Intervenciones', 'Seguimiento Crónico'].map(tag => (
                                    <span key={tag} className="rounded-xl bg-white border border-gray-100 px-4 py-2 text-[11px] font-bold text-primary shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Bloque 5: CTA (PIE DE PANEL) */}
                <div className="bg-white p-8 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                    <div className="mb-6 flex items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                        <div className="flex items-center gap-3 text-emerald-700">
                            <span className="material-symbols-outlined">event_available</span>
                            <span className="text-xs font-black uppercase tracking-tight">Turnos:</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-800">7 disponibles</span>
                    </div>
                    <button 
                        onClick={onReservar}
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-[#00284A] hover:text-[#C7A36E]"
                    >
                        <span className="material-symbols-outlined transition-transform group-hover:scale-110">calendar_add_on</span>
                        Solicitar Turno con el Profesional
                    </button>
                </div>
            </div>
        </>
    );
}