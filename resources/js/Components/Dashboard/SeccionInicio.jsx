export default function SeccionInicio({ nombreCompleto, nombrePaciente, turnosFuturos, setTab, handleCancelarTurno }) {
    return (
        <div className="w-full animate-fade-in">
            {/* Cabecera del Dashboard */}
            <div className="mb-8 border-b border-gray-100 pb-6">
                <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-primary lg:text-4xl">Panel de Control</h1>
                <p className="font-semibold text-brandText">Hola {nombrePaciente}, este es el resumen de tu salud hoy.</p>
            </div>

            {/* Contenedor Principal */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

                {/* --- COLUMNA IZQUIERDA  --- */}
                <div className="w-full lg:w-7/12">
                    {turnosFuturos.length > 0 ? (
                        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 sm:p-8 text-white shadow-lg shadow-primary/20 flex flex-col">
                            {/* Marca de agua de fondo */}
                            <div className="absolute -right-4 -top-10 opacity-[0.07] pointer-events-none">
                                <span className="material-symbols-outlined text-[200px]">cardiology</span>
                            </div>

                            {/* Cabecera de la tarjeta */}
                            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 relative z-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Tu Próximo Turno</h2>
                                {turnosFuturos[0].estado === 1 && (
                                    <span className="bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 w-fit shadow-sm">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Pendiente
                                    </span>
                                )}
                            </div>

                            {/* Información principal */}
                            <div className="mb-6 flex flex-col sm:flex-row gap-5 relative z-10">
                                <div className="flex flex-col items-center justify-center bg-white rounded-xl w-full sm:w-24 h-24 shrink-0 shadow-lg text-primary text-center overflow-hidden">
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 w-full py-1.5 border-b border-gray-100 text-primary">
                                        {new Date(turnosFuturos[0].fecha + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short' })}
                                    </span>
                                    <span className="text-4xl font-black leading-none mt-2">
                                        {new Date(turnosFuturos[0].fecha + 'T00:00:00').getDate()}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase text-gray-400 mt-1 mb-2">
                                        {new Date(turnosFuturos[0].fecha + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'short' })}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center w-full min-w-0">
                                    <div className="flex items-center gap-2 mb-2 bg-white/10 w-fit px-3 py-1 rounded-lg border border-white/10">
                                        <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                                        <span className="text-xs font-black uppercase tracking-widest text-secondary whitespace-nowrap">
                                            {turnosFuturos[0].hora}
                                        </span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight break-words">
                                        {turnosFuturos[0].especialidad?.nombre}
                                    </h3>
                                    <p>{turnosFuturos[0].especialidad?.id}</p>
                                    <p>id_turno: {turnosFuturos[0].id}</p>
                                    <div className="flex items-center gap-2 mt-2 opacity-80 flex-wrap">
                                        <span className="material-symbols-outlined text-sm shrink-0">medical_information</span>
                                        <p className="text-sm font-semibold truncate">Dr/a. {turnosFuturos[0].profesional?.nombre_completo}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bloque de Indicaciones */}
                            <div className="mb-6 rounded-xl bg-white/5 p-4 border border-white/10 relative z-10 flex items-start gap-3">
                                <div className="rounded-full bg-secondary/20 p-1.5 text-secondary shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-[16px]">assignment_late</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Recordatorio importante</p>
                                    <p className="text-xs font-medium text-white/70 leading-relaxed">
                                        Asistir con 15 minutos de anticipación. Recordá presentar tu DNI y credencial física o digital en recepción.
                                    </p>
                                </div>
                            </div>

                            {/* Footer con acciones */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 border-t border-white/10 pt-6 mt-auto">
                                <div className="flex w-full sm:w-auto gap-3">
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-white/20 border border-white/10">
                                        <span className="material-symbols-outlined text-[16px]">map</span> Ubicación
                                    </button>
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary transition-[background-color,transform] hover:bg-[#D4B07B] hover:-translate-y-0.5 shadow-lg shadow-secondary/20">
                                        <span className="material-symbols-outlined text-[16px]">list_alt</span> Preparación
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleCancelarTurno(turnosFuturos[0].id)}
                                    className="w-full sm:w-auto ml-0 sm:ml-auto text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span> Cancelar turno
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-sm p-8 py-16 text-center border border-gray-100">
                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-3">event_available</span>
                            <h3 className="text-lg font-black tracking-tight text-primary uppercase">Sin turnos próximos</h3>
                            <p className="text-sm font-semibold text-gray-400">Actualmente no tenés citas programadas.</p>
                        </div>
                    )}
                </div>

                {/* --- COLUMNA DERECHA --- */}
                <div className="w-full lg:w-5/12 flex flex-col gap-6 lg:gap-8">

                    {/* Tarjeta de Últimos Resultados */}
                    <div className="flex flex-col rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Últimos Resultados</h2>
                            <button className="text-[9px] font-black uppercase tracking-widest text-secondary hover:underline transition-colors">Ver todos</button>
                        </div>
                        <div className="space-y-4">
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
                                        <p className="text-sm font-black text-primary uppercase truncate">Análisis de Sangre</p>
                                        <p className="mt-0.5 text-xs font-semibold text-gray-400">Hoy</p>
                                    </div>
                                </div>
                                <span className="w-fit shrink-0 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-700">Proceso</span>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Accesos Rápidos */}
                    <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Accesos Rápidos</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <button onClick={() => setTab('turnos')} className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-[#F4F7F9] p-4 transition-[background-color,border-color,transform] hover:-translate-y-1 hover:border-secondary/30 hover:bg-white hover:shadow-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Mis Turnos</span>
                            </button>

                            <button onClick={() => setTab('cartilla')} className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-[#F4F7F9] p-4 transition-[background-color,border-color,transform] hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                                    <span className="material-symbols-outlined text-[20px]">groups</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Mis Médicos</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}