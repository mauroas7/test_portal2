import { useState } from 'react';

export default function SeccionTurnos({ turnosFuturos, turnosPasados, setIsModalOpen, handleCancelarTurno }) {
    // Encapsulamos el estado acá adentro para mejorar rendimiento
    const [subTabTurnos, setSubTabTurnos] = useState('proximos'); 

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center lg:mb-12">
                <div className="w-full md:w-auto">
                    <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mis Turnos</h1>
                    <p className="font-semibold text-brandText">Gestione sus citas médicas y revise su historial.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30 transition-[background-color,color,shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#00284A] hover:text-[#C7A36E] hover:shadow-2xl hover:shadow-[#00284A]/40"
                >
                    <span className="material-symbols-outlined text-[24px] transition-transform duration-300 group-hover:translate-x-1">calendar_add_on</span>
                    Solicitar Nuevo Turno
                </button>
            </div>

            <div className="mb-8 flex p-1.5 bg-white shadow-sm w-fit rounded-xl border border-gray-100">
                <button onClick={() => setSubTabTurnos('proximos')} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabTurnos === 'proximos' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}>
                    Próximos Turnos
                </button>
                <button onClick={() => setSubTabTurnos('historial')} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabTurnos === 'historial' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}>
                    Historial de Visitas
                </button>
            </div>
            
            {subTabTurnos === 'proximos' && (
                <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm animate-fade-in">
                    <div className="hidden grid-cols-5 border-b border-gray-100 bg-[#F8F9FA] px-10 py-5 lg:grid">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Especialidad</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Médico</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Fecha y Hora</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Sede / Lugar</span>
                        <span className="text-right pr-4 text-[10px] font-black uppercase tracking-widest text-brandText">Acciones</span>
                    </div>

                    {turnosFuturos.length > 0 ? (
                        <div className="flex flex-col">
                            {turnosFuturos.map((turno) => (
                                <div key={turno.id} className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F4F7F9] lg:grid-cols-5 lg:items-center lg:px-10">
                                    <div className="min-w-0">
                                        <p className="text-sm font-black uppercase text-primary truncate">{turno.especialidad}</p>
                                        <span className="lg:hidden block mt-1 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-primary w-fit border border-blue-100">Confirmado</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-gray-500 truncate">Dr/a. {turno.medico_nombre}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brandText">
                                            {new Date(turno.fecha_hora).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                                        </p>
                                        <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-secondary">
                                            {new Date(turno.fecha_hora).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs
                                        </p>
                                    </div>
                                    <div className="hidden lg:block">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Sede Central</p>
                                        <p className="text-[10px] font-medium text-gray-400">Consultorio 04</p>
                                    </div>
                                    <div className="flex justify-start lg:justify-end">
                                        <button 
                                            onClick={() => handleCancelarTurno(turno.id)} 
                                            className="group flex w-full lg:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-500 transition-[background-color,border-color,color,shadow] duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 shadow-sm hover:shadow-md"
                                        >
                                            <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:-rotate-12">event_busy</span> 
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                            <img src="/img/medical-care.svg" alt="Vacío" className="mb-6 w-48 opacity-90" />
                            <h3 className="text-xl font-black tracking-tight text-primary uppercase">No tenés turnos programados</h3>
                        </div>
                    )}
                </div>
            )}

            {subTabTurnos === 'historial' && (
                <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm animate-fade-in">
                    <div className="hidden grid-cols-4 border-b border-gray-100 bg-[#F8F9FA] px-10 py-5 lg:grid">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText col-span-2">Especialidad y Médico</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Atención</span>
                        <span className="text-right pr-4 text-[10px] font-black uppercase tracking-widest text-brandText">Acciones</span>
                    </div>
                    {turnosPasados.length > 0 ? (
                        <div className="flex flex-col">
                            {turnosPasados.map((turno) => (
                                <div key={turno.id} className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F4F7F9] lg:grid-cols-4 lg:items-center lg:px-10 opacity-70 hover:opacity-100">
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-sm font-black uppercase text-primary">{turno.especialidad}</p>
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-gray-500 border border-gray-200">Asistió</span>
                                        </div>
                                        <p className="text-xs font-semibold text-gray-500">Dr/a. {turno.medico_nombre}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500">
                                            {new Date(turno.fecha_hora).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap lg:justify-end gap-2 mt-2 lg:mt-0">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline flex items-center gap-1 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-[shadow,border-color]">
                                            <span className="material-symbols-outlined text-[16px]">description</span> Ver resumen
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">history_toggle_off</span>
                            <h3 className="mb-2 text-xl font-black tracking-tight text-primary uppercase">No hay historial</h3>
                            <p className="text-sm font-semibold text-gray-400">Sus visitas médicas aparecerán aquí una vez finalizadas.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}