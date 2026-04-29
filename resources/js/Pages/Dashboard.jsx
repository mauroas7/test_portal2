import { useState, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, turnos = [] }) {
    const [tab, setTab] = useState('inicio');
    const [subTabTurnos, setSubTabTurnos] = useState('proximos'); 
    
    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { post } = useForm();

    const userName = auth?.user?.name ?? 'Paciente';

    const turnosFuturos = useMemo(() => {
        const hoy = new Date();
        return turnos.filter(t => new Date(t.fecha_hora) >= hoy);
    }, [turnos]);

    const turnosPasados = useMemo(() => {
        const hoy = new Date();
        return turnos.filter(t => new Date(t.fecha_hora) < hoy);
    }, [turnos]);

    const menuItems = [
        { id: 'inicio', label: 'Inicio', icon: 'home' },
        { id: 'turnos', label: 'Turnos', icon: 'calendar_month' },
        { id: 'salud', label: 'Salud', icon: 'monitor_heart' },
        { id: 'cartilla', label: 'Cartilla Médica', icon: 'medical_services' },
        { id: 'documentos', label: 'Documentos', icon: 'folder_open' },
    ];

    const handleTabChange = (item) => {
        setTab(item.id);
        setMobileMenu(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const navButtonClass = (item) => {
        const active = tab === item.id;
        return `flex w-full items-center gap-4 rounded-xl border-l-4 px-4 py-3.5 text-left transition-all ${
            active
                ? 'border-secondary bg-white text-primary shadow-sm'
                : 'border-transparent text-brandText hover:bg-white hover:shadow-sm'
        } font-semibold`;
    };

    const renderNavigation = () => (
        <nav className="space-y-2">
            {menuItems.map((item) => (
                <button key={item.id} type="button" onClick={() => handleTabChange(item)} className={navButtonClass(item)}>
                    <span className={`material-symbols-outlined text-[22px] ${tab === item.id ? 'text-secondary' : 'text-gray-400'}`}>
                        {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                </button>
            ))}
        </nav>
    );

    const renderProfileMenu = (align = 'right-0') => (
        profileOpen && (
            <div className={`absolute top-14 ${align} z-50 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-2xl`}>
                <Link href={route('profile.edit')} className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-brandText transition-colors hover:bg-[#F8F9FA]">
                    <span className="material-symbols-outlined text-secondary">person</span> Mi Perfil
                </Link>
                <hr className="my-2 border-gray-50" />
                <form onSubmit={handleLogout}>
                    <button type="submit" className="flex w-full items-center gap-3 px-5 py-3 text-sm font-black uppercase tracking-wider text-red-500 transition-colors hover:bg-red-50">
                        <span className="material-symbols-outlined">logout</span> Cerrar sesión
                    </button>
                </form>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-primary p-3 font-sans antialiased lg:p-4">
            <Head title="Home | Hospital Universitario" />

            <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1900px] overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:min-h-[calc(100vh-2rem)]">
                
                {/* --- SIDEBAR IZQUIERDO --- */}
                <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-100 bg-[#F8F9FA] p-8 lg:flex">
                    <div className="mb-12 flex justify-center px-2">
                        <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-44" />
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2">
                        <p className="mb-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Menú Principal</p>
                        {renderNavigation()}
                    </div>
                </aside>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <main className="flex min-w-0 flex-1 flex-col bg-white">
                    <header className="shrink-0 border-b border-gray-50 px-5 py-4 lg:px-12 lg:py-6">
                        <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
                            <button type="button" onClick={() => setMobileMenu((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F9FA] text-primary transition-colors hover:bg-gray-100">
                                <span className="material-symbols-outlined">{mobileMenu ? 'close' : 'menu'}</span>
                            </button>
                            <img src="/img/Logo HU Uso Diario.svg" alt="Logo" className="h-auto w-32" />
                            <div className="relative">
                                <button type="button" onClick={() => setProfileOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-black text-white shadow-md">
                                    {userName.substring(0, 1)}
                                </button>
                                {renderProfileMenu()}
                            </div>
                        </div>

                        {mobileMenu && (
                            <div className="mb-4 rounded-2xl border border-gray-100 bg-[#F8F9FA] p-3 lg:hidden">
                                {renderNavigation()}
                            </div>
                        )}

                        <div className="relative w-full max-w-2xl">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input type="text" placeholder="Buscar médico, especialidad, estudios..." className="w-full rounded-2xl border-none bg-[#F8F9FA] py-3.5 pl-12 pr-4 text-sm font-semibold text-primary transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-secondary/20" />
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto bg-white p-5 lg:p-12">
                        
                        {/* =========================================
                            PANEL DE CONTROL (Inicio)
                        ========================================= */}
                        {tab === 'inicio' && (
                            <div className="mx-auto max-w-[1400px]">
                                <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-12">
                                    <div className="w-full md:w-auto">
                                        <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-primary lg:text-4xl">Panel de Control</h1>
                                        <p className="font-semibold text-brandText">Hola {userName}, este es el resumen de tu salud hoy.</p>
                                    </div>
                                    <button onClick={() => setTab('turnos')} className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/30 transition-all hover:scale-105 hover:bg-[#B38F5A]">
                                        <span className="material-symbols-outlined text-[24px] transition-transform group-hover:rotate-12">calendar_add_on</span>
                                        Solicitar Nuevo Turno
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                                    <div className="w-full">
                                        {turnosFuturos.length > 0 ? (
                                            <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 sm:p-8 text-white shadow-xl shadow-primary/20">
                                                <div className="absolute -right-4 -top-10 opacity-[0.07]">
                                                    <span className="material-symbols-outlined text-[200px]">cardiology</span>
                                                </div>
                                                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 relative z-10">
                                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Tu Próximo Turno</h2>
                                                    {turnosFuturos[0].estado === 'confirmado' && (
                                                        <span className="bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Confirmado
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mb-8 flex flex-col sm:flex-row gap-5 relative z-10">
                                                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-full sm:w-24 h-24 shrink-0 shadow-lg text-primary text-center overflow-hidden">
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
                                                
                                                {/* Botones de Acción (Solo Cancelar) */}
                                                <div className="flex relative z-10 border-t border-white/10 pt-6">
                                                    <button className="w-full sm:w-auto rounded-xl border border-white/20 bg-transparent px-6 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-red-500/20 hover:border-red-500/50 flex items-center justify-center gap-2">
                                                        <span className="material-symbols-outlined text-[18px]">event_busy</span> Cancelar Turno
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-[#F8F9FA] p-8 text-center border border-dashed border-gray-200">
                                                <span className="material-symbols-outlined text-4xl text-gray-300 mb-3">event_available</span>
                                                <h3 className="text-lg font-black tracking-tight text-primary uppercase">Sin turnos próximos</h3>
                                                <p className="text-sm font-semibold text-gray-400">Actualmente no tenés citas programadas.</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full">
                                        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm h-full flex flex-col">
                                            <div className="mb-6 flex items-center justify-between">
                                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Últimos Resultados</h2>
                                                <button onClick={() => setTab('salud')} className="text-[9px] font-black uppercase tracking-widest text-secondary hover:underline">Ver todos</button>
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-gray-50 bg-[#F8F9FA] p-4 transition-colors hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                                            <span className="material-symbols-outlined text-primary text-xl">radiology</span>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black text-primary uppercase truncate">Ecografía Abdominal</p>
                                                            <p className="mt-0.5 text-xs font-semibold text-gray-400">Hace 2 días</p>
                                                        </div>
                                                    </div>
                                                    <span className="w-fit shrink-0 rounded-full bg-green-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-green-700">Disponible</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-gray-50 bg-[#F8F9FA] p-4 transition-colors hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                                            <span className="material-symbols-outlined text-primary text-xl">bloodtype</span>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black text-primary uppercase truncate">Análisis de Sangre Completo</p>
                                                            <p className="mt-0.5 text-xs font-semibold text-gray-400">Hoy</p>
                                                        </div>
                                                    </div>
                                                    <span className="w-fit shrink-0 rounded-full bg-amber-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-700">Proceso</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* =========================================
                            SECCIÓN 2: MIS TURNOS (Rediseñada)
                        ========================================= */}
                        {tab === 'turnos' && (
                            <div className="mx-auto max-w-6xl">
                                
                                {/* HEADER: Título y Botón Principal (Mismo botón que el inicio) */}
                                <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                                    <div>
                                        <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mis Turnos</h1>
                                        <p className="font-semibold text-brandText">Gestione sus citas médicas y revise su historial.</p>
                                    </div>
                                    <button className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/30 transition-all hover:scale-105 hover:bg-[#B38F5A]">
                                        <span className="material-symbols-outlined text-[24px] transition-transform group-hover:rotate-12">calendar_add_on</span>
                                        Solicitar Nuevo Turno
                                    </button>
                                </div>

                                {/* PÍLDORAS DE NAVEGACIÓN (Sub-Tabs) */}
                                <div className="mb-8 flex p-1 bg-[#F8F9FA] w-fit rounded-xl border border-gray-100">
                                    <button 
                                        onClick={() => setSubTabTurnos('proximos')} 
                                        className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabTurnos === 'proximos' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}
                                    >
                                        Próximos Turnos
                                    </button>
                                    <button 
                                        onClick={() => setSubTabTurnos('historial')} 
                                        className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabTurnos === 'historial' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}
                                    >
                                        Historial de Visitas
                                    </button>
                                </div>
                                
                                {/* VISTA 1: PRÓXIMOS TURNOS (Optimizado) */}
                                    {subTabTurnos === 'proximos' && (
                                        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm animate-fade-in">
                                            {/* Header: 5 Columnas Simétricas */}
                                            <div className="hidden grid-cols-5 border-b border-gray-100 bg-[#F8F9FA] px-10 py-5 lg:grid">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Especialidad</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Médico</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Fecha y Hora</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Sede / Lugar</span>
                                                <span className="text-center text-[10px] font-black uppercase tracking-widest text-brandText">Acciones</span>
                                            </div>

                                            {turnosFuturos.length > 0 ? (
                                                <div className="flex flex-col">
                                                    {turnosFuturos.map((turno) => (
                                                        <div key={turno.id} className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F8F9FA] lg:grid-cols-5 lg:items-center lg:px-10">
                                                            {/* 1. Especialidad */}
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-black uppercase text-primary truncate">{turno.especialidad}</p>
                                                                <span className="lg:hidden block mt-1 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-primary w-fit">Confirmado</span>
                                                            </div>
                                                            
                                                            {/* 2. Médico */}
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-semibold text-gray-500 truncate">Dr/a. {turno.medico_nombre}</p>
                                                            </div>

                                                            {/* 3. Fecha */}
                                                            <div>
                                                                <p className="text-sm font-bold text-brandText">
                                                                    {new Date(turno.fecha_hora).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                                                                </p>
                                                                <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-secondary">
                                                                    {new Date(turno.fecha_hora).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs
                                                                </p>
                                                            </div>

                                                            {/* 4. Sede (Nuevo dato útil) */}
                                                            <div className="hidden lg:block">
                                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Sede Central</p>
                                                                <p className="text-[10px] font-medium text-gray-400">Consultorio 04</p>
                                                            </div>
                                                            
                                                            {/* 5. Acción (Centrada) */}
                                                            <div className="flex justify-start lg:justify-center">
                                                                <button className="w-full lg:w-auto text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-5 py-2.5 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                                                                    <span className="material-symbols-outlined text-[18px]">event_busy</span>
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

                                {/* VISTA 2: HISTORIAL DE VISITAS */}
                                {subTabTurnos === 'historial' && (
                                    <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm animate-fade-in">
                                        <div className="hidden grid-cols-4 border-b border-gray-100 bg-[#F8F9FA] px-10 py-5 lg:grid">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-brandText col-span-2">Especialidad y Médico</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Atención</span>
                                            <span className="text-center text-[10px] font-black uppercase tracking-widest text-brandText">Acciones</span>
                                        </div>
                                        {turnosPasados.length > 0 ? (
                                            <div className="flex flex-col">
                                                {turnosPasados.map((turno) => (
                                                    <div key={turno.id} className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F8F9FA] lg:grid-cols-4 lg:items-center lg:px-10 opacity-70 hover:opacity-100">
                                                        <div className="lg:col-span-2">
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <p className="text-sm font-black uppercase text-primary">{turno.especialidad}</p>
                                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-gray-500">Asistió</span>
                                                            </div>
                                                            <p className="text-xs font-semibold text-gray-500">Dr/a. {turno.medico_nombre}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-500">
                                                                {new Date(turno.fecha_hora).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap lg:justify-end gap-2 mt-2 lg:mt-0">
                                                            <button className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline flex items-center gap-1">
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
                        )}

                        {/* RESTO DE SECCIONES */}
                        {tab === 'salud' && ( <div> <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Mi Salud</h1> </div> )}
                        {tab === 'cartilla' && ( <div> <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Cartilla Médica</h1> </div> )}
                        {tab === 'documentos' && ( <div> <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Mis Documentos</h1> </div> )}
                    </div>
                </main>

                {/* --- SIDEBAR DERECHO --- */}
                <aside className="hidden w-80 shrink-0 flex-col border-l border-gray-50 bg-white xl:flex z-20">
                    <div className="relative flex h-24 shrink-0 items-center justify-end gap-5 border-b border-gray-50 bg-white px-8">
                        <button type="button" className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-[#F8F9FA] hover:text-primary">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100"></div>
                        <div className="text-right">
                            <p className="text-[13px] font-black uppercase leading-none text-primary">{userName}</p>
                            <p className="mt-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-secondary">Paciente</p>
                        </div>
                        <button type="button" onClick={() => setProfileOpen((value) => !value)} className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-black text-white shadow-md transition-transform hover:scale-105">
                            {userName.substring(0, 1)}
                        </button>
                        {renderProfileMenu('right-8')}
                    </div>

                    {/* ÁREA DE RENDERIZADO CONTEXTUAL (Sidebar Dinámico) */}
                    <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
                        
                        {/* Contexto 1: INICIO */}
                        {tab === 'inicio' && (
                            <div className="p-8 animate-fade-in">
                                <h2 className="mb-8 px-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Novedades</h2>
                                <NewsCards />
                            </div>
                        )}

                        {/* Contexto 2: TURNOS */}
                        {tab === 'turnos' && (
                            <div className="p-8 animate-fade-in">
                                <h2 className="mb-6 px-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Calendario</h2>
                                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-center flex flex-col items-center justify-center min-h-[250px]">
                                    <span className="material-symbols-outlined text-blue-100 text-6xl mb-4">calendar_month</span>
                                    <p className="text-sm font-black text-primary uppercase">Navegador de Fechas</p>
                                </div>
                            </div>
                        )}

                        {/* Contextos restantes: Limpios y sin relleno innecesario */}
                        {(tab === 'salud' || tab === 'cartilla' || tab === 'documentos') && (
                            <div className="flex h-full items-center justify-center p-8 opacity-[0.03]">
                                {/* Marca de agua súper sutil. No molesta, no es relleno, solo da textura al fondo. */}
                                <span className="material-symbols-outlined text-[120px] text-primary">local_hospital</span>
                            </div>
                        )}
                        
                    </div>
                </aside>
            </div>
        </div>
    );
}

function NewsCards() {
    return (
        <div className="space-y-4">
            <article className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-secondary/30 hover:shadow-md">
                <span className="mb-3 inline-block rounded bg-secondary/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-secondary">Salud</span>
                <h4 className="mb-2 text-sm font-black uppercase leading-snug text-primary transition-colors group-hover:text-secondary">Campaña Antigripal 2026.</h4>
                <p className="text-xs font-medium leading-relaxed text-gray-400">Conozca los horarios en sede central.</p>
            </article>
            <article className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-secondary/30 hover:shadow-md">
                <h4 className="mb-2 text-sm font-black uppercase leading-snug text-primary transition-colors group-hover:text-secondary">Nuevos profesionales.</h4>
                <p className="text-xs font-medium leading-relaxed text-gray-400">Se incorpora equipo en cardiología infantil.</p>
            </article>
        </div>
    );
}