// resources/js/Components/Dashboard/SeccionInicio.jsx

export default function SeccionInicio({ userName, turnosFuturos }) {
    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8 border-b border-gray-100 pb-6">
                <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-primary lg:text-4xl">Panel de Control</h1>
                <p className="font-semibold text-brandText">Hola {userName}, este es el resumen de tu salud hoy.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                {/* Bloque de Próximo Turno */}
                <div className="w-full">
                    {turnosFuturos.length > 0 ? (
                        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 sm:p-8 text-white shadow-lg shadow-primary/20 flex flex-col">
                            <div className="absolute -right-4 -top-10 opacity-[0.07]">
                                <span className="material-symbols-outlined text-[200px]">cardiology</span>
                            </div>
                            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 relative z-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Tu Próximo Turno</h2>
                                {turnosFuturos[0].estado === 'confirmado' && (
                                    <span className="bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 w-fit shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Confirmado
                                    </span>
                                )}
                            </div>
                            <div className="mb-8 flex flex-col sm:flex-row gap-5 relative z-10">
                                <div className="flex flex-col items-center justify-center bg-white rounded-xl w-full sm:w-24 h-24 shrink-0 shadow-lg text-primary text-center overflow-hidden">
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 w-full py-1.5 border-b border-gray-100 text-primary">
                                        {new Date(turnosFuturos[0].fecha_hora).toLocaleDateString('es-AR', { month: 'short' })}
                                    </span>
                                    <span className="text-4xl font-black leading-none mt-2">
                                        {new Date(turnosFuturos[0].fecha_hora).getDate()}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase text-gray-400 mt-1 mb-2">
                                        {new Date(turnosFuturos[0].fecha_hora).toLocaleDateString('es-AR', { weekday: 'short' })}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center w-full min-w-0">
                                    <div className="flex items-center gap-2 mb-2 bg-white/10 w-fit px-3 py-1 rounded-lg border border-white/10">
                                        <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                                        <span className="text-xs font-black uppercase tracking-widest text-secondary whitespace-nowrap">
                                            {new Date(turnosFuturos[0].fecha_hora).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs
                                        </span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight break-words">
                                        {turnosFuturos[0].especialidad}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2 opacity-80 flex-wrap">
                                        <span className="material-symbols-outlined text-sm shrink-0">medical_information</span>
                                        <p className="text-sm font-semibold truncate">Dr/a. {turnosFuturos[0].medico_nombre}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end relative z-10 border-t border-white/10 pt-6 mt-auto">
                                <button className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[11px] font-black uppercase tracking-widest text-white/70 transition-[background-color,border-color,color,shadow] duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30">
                                    <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:scale-110">event_busy</span> 
                                    Cancelar Turno
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-sm p-8 text-center border border-gray-100">
                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-3">event_available</span>
                            <h3 className="text-lg font-black tracking-tight text-primary uppercase">Sin turnos próximos</h3>
                            <p className="text-sm font-semibold text-gray-400">Actualmente no tenés citas programadas.</p>
                        </div>
                    )}
                </div>

                {/* Bloque de Resultados Rápidos */}
                <div className="w-full">
                    <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm h-full flex flex-col border border-gray-100">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Últimos Resultados</h2>
                            <button className="text-[9px] font-black uppercase tracking-widest text-secondary hover:underline transition-colors">Ver todos</button>
                        </div>
                        <div className="space-y-4 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm p-4 transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md cursor-pointer">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-primary">
                                        <span className="material-symbols-outlined text-xl">radiology</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-primary uppercase truncate">Ecografía Abdominal</p>
                                        <p className="mt-0.5 text-xs font-semibold text-gray-400">Hace 2 días</p>
                                    </div>
                                </div>
                                <span className="w-fit shrink-0 rounded-full bg-green-50 border border-green-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-green-700">Disponible</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm p-4 transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md cursor-pointer">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-primary">
                                        <span className="material-symbols-outlined text-xl">bloodtype</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-primary uppercase truncate">Análisis de Sangre Completo</p>
                                        <p className="mt-0.5 text-xs font-semibold text-gray-400">Hoy</p>
                                    </div>
                                </div>
                                <span className="w-fit shrink-0 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-700">Proceso</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}