import { useState, useMemo } from 'react';
import { Head, Link, useForm, router} from '@inertiajs/react';

// 1. Recibimos especialidades_db y medicos_db desde el Controlador de Laravel
export default function Dashboard({ auth, turnos = [], especialidades_db = [], medicos_db = [] }) {
    const [tab, setTab] = useState('inicio');
    const [subTabTurnos, setSubTabTurnos] = useState('proximos'); 
    const [subTabSalud, setSubTabSalud] = useState('resultados');
    const [subTabCartilla, setSubTabCartilla] = useState('especialidades');
    const [cartillaEspecialidadFilter, setCartillaEspecialidadFilter] = useState('');
    const [globalSearch, setGlobalSearch] = useState('');
    
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
                {/* Cambiamos el <Link> por una etiqueta <a> común y le sacamos la ruta rota temporalmente */}
                <a href="#" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-brandText transition-colors hover:bg-[#F8F9FA]">
                    <span className="material-symbols-outlined text-secondary">person</span> Mi Perfil
                </a>
                <hr className="my-2 border-gray-50" />
                <form onSubmit={handleLogout}>
                    <button type="submit" className="flex w-full items-center gap-3 px-5 py-3 text-sm font-black uppercase tracking-wider text-red-500 transition-colors hover:bg-red-50">
                        <span className="material-symbols-outlined">logout</span> Cerrar sesión
                    </button>
                </form>
            </div>
        )
    );

    // Estados para el Modal de Nuevo Turno (Ahora con IDs)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [nuevoTurno, setNuevoTurno] = useState({
        especialidad_id: null,
        especialidad: null,
        medico_id: null,
        medico: null,
        fecha: null,
        hora: null
    });

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setModalStep(1);
            setNuevoTurno({ especialidad_id: null, especialidad: null, medico_id: null, medico: null, fecha: null, hora: null });
        }, 300);
    };

    return (
        <div className="min-h-screen bg-primary p-3 font-sans antialiased lg:p-4">
            <Head title="Home | Hospital Universitario" />

            <div className="mx-auto flex flex-col min-h-[calc(100vh-1.5rem)] w-full max-w-[1900px] overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:min-h-[calc(100vh-2rem)]">
                
                <div className="flex flex-1 w-full min-h-[calc(100vh-1.5rem)] lg:min-h-[calc(100vh-2rem)]">
                    {/* SIDEBAR IZQUIERDO */}
                    <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-100 bg-[#F8F9FA] p-8 lg:flex">
                        <div className="mb-12 flex justify-center px-2">
                            <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-44" />
                        </div>
                        <div className="flex-1 pr-2">
                        <p className="mb-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Menú Principal</p>
                        {renderNavigation()}
                    </div>
                </aside>

                {/* CONTENIDO PRINCIPAL */}
                <main className="flex min-w-0 flex-1 flex-col bg-white">
                    
                    {/* Header */}
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

                        <div className="relative w-full max-w-2xl z-50">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input 
                                type="text" 
                                value={globalSearch}
                                onChange={(e) => setGlobalSearch(e.target.value)}
                                placeholder="Buscar médico, especialidad, estudios..." 
                                className="w-full rounded-2xl border-none bg-[#F8F9FA] py-3.5 pl-12 pr-4 text-sm font-semibold text-primary transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-secondary/20" 
                            />
                            {globalSearch.length > 1 && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-[400px] overflow-y-auto">
                                    {/* Resultados Especialidades */}
                                    {especialidades_db.filter(e => e.nombre.toLowerCase().includes(globalSearch.toLowerCase())).map(esp => (
                                        <button key={`esp-${esp.id}`} onClick={() => {
                                            setCartillaEspecialidadFilter(esp.id.toString());
                                            setTab('cartilla');
                                            setSubTabCartilla('profesionales');
                                            setGlobalSearch('');
                                        }} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0">
                                            <span className="material-symbols-outlined text-secondary">medical_services</span>
                                            <div>
                                                <p className="text-sm font-bold text-primary">{esp.nombre}</p>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400">Especialidad</p>
                                            </div>
                                        </button>
                                    ))}
                                    {/* Resultados Médicos */}
                                    {medicos_db.filter(m => (m.nombre + ' ' + m.apellido).toLowerCase().includes(globalSearch.toLowerCase())).map(med => (
                                        <button key={`med-${med.id}`} onClick={() => {
                                            setCartillaEspecialidadFilter(med.especialidad_id.toString());
                                            setTab('cartilla');
                                            setSubTabCartilla('profesionales');
                                            setGlobalSearch('');
                                        }} className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0">
                                            <span className="material-symbols-outlined text-secondary">person</span>
                                            <div>
                                                <p className="text-sm font-bold text-primary">Dr/a. {med.apellido}, {med.nombre}</p>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400">Médico</p>
                                            </div>
                                        </button>
                                    ))}
                                    {especialidades_db.filter(e => e.nombre.toLowerCase().includes(globalSearch.toLowerCase())).length === 0 && medicos_db.filter(m => (m.nombre + ' ' + m.apellido).toLowerCase().includes(globalSearch.toLowerCase())).length === 0 && (
                                        <div className="px-5 py-6 text-center text-sm font-semibold text-gray-500">
                                            No se encontraron resultados para "{globalSearch}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="flex flex-1 flex-col bg-white relative">
                        <div className="flex-1 p-5 lg:p-12">
                            
                            {/* --- SECCIÓN 1: INICIO --- */}
                            {tab === 'inicio' && (
                                <div className="mx-auto max-w-[1400px]">
                                    <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-12">
                                        <div className="w-full md:w-auto">
                                            <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-primary lg:text-4xl">Panel de Control</h1>
                                            <p className="font-semibold text-brandText">Hola {userName}, este es el resumen de tu salud hoy.</p>
                                        </div>
                                        <button onClick={() => setIsModalOpen(true)} className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/30 transition-all hover:scale-105 hover:bg-[#B38F5A]">
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
                                                    {/* Resultados estáticos como placeholder visual temporal */}
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

                            {/* --- SECCIÓN 2: MIS TURNOS --- */}
                            {tab === 'turnos' && (
                                <div className="mx-auto max-w-6xl">
                                    <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                                        <div>
                                            <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mis Turnos</h1>
                                            <p className="font-semibold text-brandText">Gestione sus citas médicas y revise su historial.</p>
                                        </div>
                                        <button onClick={() => setIsModalOpen(true)} className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/30 transition-all hover:scale-105 hover:bg-[#B38F5A]">
                                            <span className="material-symbols-outlined text-[24px] transition-transform group-hover:rotate-12">calendar_add_on</span>
                                            Solicitar Nuevo Turno
                                        </button>
                                    </div>

                                    <div className="mb-8 flex p-1 bg-[#F8F9FA] w-fit rounded-xl border border-gray-100">
                                        <button onClick={() => setSubTabTurnos('proximos')} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabTurnos === 'proximos' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}>
                                            Próximos Turnos
                                        </button>
                                        <button onClick={() => setSubTabTurnos('historial')} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabTurnos === 'historial' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}>
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
                                                <span className="text-center text-[10px] font-black uppercase tracking-widest text-brandText">Acciones</span>
                                            </div>

                                            {turnosFuturos.length > 0 ? (
                                                <div className="flex flex-col">
                                                    {turnosFuturos.map((turno) => (
                                                        <div key={turno.id} className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F8F9FA] lg:grid-cols-5 lg:items-center lg:px-10">
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-black uppercase text-primary truncate">{turno.especialidad}</p>
                                                                <span className="lg:hidden block mt-1 rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-primary w-fit">Confirmado</span>
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
                                                            <div className="flex justify-start lg:justify-center">
                                                                <button className="w-full lg:w-auto text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-5 py-2.5 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                                                                    <span className="material-symbols-outlined text-[18px]">event_busy</span> Cancelar
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

                            {/* --- SECCIÓN 3: MI SALUD --- */}
                            {tab === 'salud' && (
                                <div className="mx-auto max-w-6xl">
                                    <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                                        <div>
                                            <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mi Salud</h1>
                                            <p className="font-semibold text-brandText">Su historial clínico, resultados de estudios y recetas médicas.</p>
                                        </div>
                                    </div>

                                    <div className="mb-8 flex p-1 bg-[#F8F9FA] w-fit rounded-xl border border-gray-100 overflow-x-auto max-w-full">
                                        <button onClick={() => setSubTabSalud('resultados')} className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabSalud === 'resultados' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}>
                                            Resultados y Estudios
                                        </button>
                                        <button onClick={() => setSubTabSalud('recetas')} className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabSalud === 'recetas' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}>
                                            Mis Recetas
                                        </button>
                                        <button onClick={() => setSubTabSalud('perfil')} className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabSalud === 'perfil' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}>
                                            Perfil Clínico
                                        </button>
                                    </div>
                                    
                                    {subTabSalud === 'resultados' && (
                                        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm animate-fade-in">
                                            <div className="hidden grid-cols-5 border-b border-gray-100 bg-[#F8F9FA] px-10 py-5 lg:grid">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText col-span-2">Estudio Requerido</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Fecha</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Estado</span>
                                                <span className="text-center text-[10px] font-black uppercase tracking-widest text-brandText">Descarga</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F8F9FA] lg:grid-cols-5 lg:items-center lg:px-10">
                                                    <div className="lg:col-span-2 flex items-center gap-4 min-w-0">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
                                                            <span className="material-symbols-outlined text-[24px]">radiology</span>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black uppercase text-primary truncate">Ecografía Abdominal Completa</p>
                                                            <p className="mt-0.5 text-xs font-semibold text-gray-500 truncate">Ordenado por: Dr. Favaloro</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-brandText">15 de Abril, 2026</p>
                                                    </div>
                                                    <div>
                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-green-700">Disponible</span>
                                                    </div>
                                                    <div className="flex justify-start lg:justify-center mt-2 lg:mt-0">
                                                        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-secondary">
                                                            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span> PDF
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F8F9FA] lg:grid-cols-5 lg:items-center lg:px-10 opacity-70">
                                                    <div className="lg:col-span-2 flex items-center gap-4 min-w-0">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                                            <span className="material-symbols-outlined text-[24px]">bloodtype</span>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black uppercase text-primary truncate">Análisis de Sangre Completo</p>
                                                            <p className="mt-0.5 text-xs font-semibold text-gray-500 truncate">Ordenado por: Dra. Martinez</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-brandText">Hoy</p>
                                                    </div>
                                                    <div>
                                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-700">Analizando</span>
                                                    </div>
                                                    <div className="flex justify-start lg:justify-center mt-2 lg:mt-0">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Demora: 48hs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subTabSalud === 'recetas' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                            <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                                                <div className="mb-6 flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                                                            <span className="material-symbols-outlined text-[28px]">prescriptions</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-black uppercase tracking-tight text-primary">Losartán 50mg</h3>
                                                            <span className="rounded bg-green-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-green-700">Tratamiento Crónico</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-8 space-y-3 rounded-2xl bg-[#F8F9FA] p-5">
                                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                                        <span className="text-xs font-semibold text-gray-400">Indicación</span>
                                                        <span className="text-xs font-black text-primary uppercase">1 comprimido cada 12hs</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                                        <span className="text-xs font-semibold text-gray-400">Profesional</span>
                                                        <span className="text-xs font-black text-primary uppercase">Dr. Favaloro</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-xs font-semibold text-gray-400">Vencimiento Receta</span>
                                                        <span className="text-xs font-black text-red-500 uppercase">En 5 días</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-secondary">
                                                        <span className="material-symbols-outlined text-[16px]">qr_code_2</span> Ver QR
                                                    </button>
                                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary transition-colors hover:bg-gray-50">
                                                        <span className="material-symbols-outlined text-[16px]">autorenew</span> Renovar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subTabSalud === 'perfil' && (
                                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[2rem] border border-gray-100 bg-white p-8 text-center shadow-sm animate-fade-in">
                                            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">medical_information</span>
                                            <h3 className="mb-2 text-xl font-black tracking-tight text-primary uppercase">Perfil Clínico </h3>
                                            <p className="text-sm font-semibold text-gray-400">Visualizar antecedentes aquí.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- SECCIÓN 4: CARTILLA MÉDICA (AHORA CON DATOS DINÁMICOS) --- */}
                            {tab === 'cartilla' && (
                            <div className="mx-auto max-w-6xl">
                                
                                <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                                    <div>
                                        <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Cartilla Médica</h1>
                                        <p className="font-semibold text-brandText">Directorio de profesionales y especialidades del Hospital.</p>
                                    </div>
                                </div>

                                <div className="mb-8 flex p-1 bg-[#F8F9FA] w-fit rounded-xl border border-gray-100">
                                    <button 
                                        onClick={() => setSubTabCartilla('especialidades')} 
                                        className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabCartilla === 'especialidades' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}
                                    >
                                        Especialidades
                                    </button>
                                    <button 
                                        onClick={() => setSubTabCartilla('profesionales')} 
                                        className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${subTabCartilla === 'profesionales' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-brandText'}`}
                                    >
                                        Profesionales A-Z
                                    </button>
                                </div>

                                {/* VISTA 1: ESPECIALIDADES DINÁMICAS */}
                                {subTabCartilla === 'especialidades' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                                        {especialidades_db.map(esp => (
                                            <div key={esp.id} className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lg">
                                                <div className="mb-4 flex items-start justify-between">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary transition-transform group-hover:scale-110">
                                                        <span className="material-symbols-outlined text-[32px]">medical_services</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="mb-1 text-lg font-black uppercase tracking-tight text-primary transition-colors group-hover:text-secondary">{esp.nombre}</h3>
                                                    <p className="text-xs font-medium text-gray-400">{esp.descripcion}</p>
                                                </div>
                                                <div 
                                                    className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4 opacity-0 transition-opacity group-hover:opacity-100"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCartillaEspecialidadFilter(esp.id.toString());
                                                        setSubTabCartilla('profesionales');
                                                    }}
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Ver plantel</span>
                                                    <span className="material-symbols-outlined text-secondary">arrow_forward</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* VISTA 2: PROFESIONALES DINÁMICOS */}
                                {subTabCartilla === 'profesionales' && (
                                    <div className="animate-fade-in">
                                        <div className="mb-8 flex flex-col md:flex-row gap-4 rounded-2xl bg-[#F8F9FA] border border-gray-100 p-4">
                                            <div className="flex-1">
                                                <label className="mb-1.5 ml-1 block text-[9px] font-black uppercase tracking-widest text-gray-400">Especialidad</label>
                                                <select 
                                                    value={cartillaEspecialidadFilter}
                                                    onChange={(e) => setCartillaEspecialidadFilter(e.target.value)}
                                                    className="w-full rounded-xl border-none bg-white py-3 pl-4 pr-10 text-sm font-bold text-primary shadow-sm outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
                                                >
                                                    <option value="">Todas las especialidades</option>
                                                    {especialidades_db.map(esp => (
                                                        <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {medicos_db.filter(prof => !cartillaEspecialidadFilter || prof.especialidad_id.toString() === cartillaEspecialidadFilter).map(prof => {
                                                const espNombre = especialidades_db.find(e => e.id === prof.especialidad_id)?.nombre || 'Especialista';
                                                return (
                                                    <div key={prof.id} className="flex flex-col sm:flex-row gap-6 overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F8F9FA] text-gray-300">
                                                            <span className="material-symbols-outlined text-[36px]">person</span>
                                                        </div>
                                                        <div className="flex flex-1 flex-col justify-between">
                                                            <div>
                                                                <h3 className="mb-0.5 text-lg font-black tracking-tight text-primary uppercase">Dr/a. {prof.apellido}, {prof.nombre}</h3>
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">{espNombre}</p>
                                                                <p className="text-sm font-semibold text-gray-500">Sede Central</p>
                                                            </div>
                                                            <div className="mt-4 flex gap-3">
                                                                <button className="flex-1 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary transition-colors hover:bg-gray-50 hover:border-gray-200 text-center">
                                                                    Ver Perfil
                                                                </button>
                                                                <button onClick={() => {
                                                                    setNuevoTurno({ ...nuevoTurno, especialidad_id: prof.especialidad_id, especialidad: espNombre, medico_id: prof.id, medico: `${prof.apellido}, ${prof.nombre}` });
                                                                    setModalStep(3);
                                                                    setIsModalOpen(true);
                                                                }} className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-secondary text-center">
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
                            )}

                            {/* --- SECCIÓN 5: MIS DOCUMENTOS --- */}
                            {tab === 'documentos' && (
                                <div className="mx-auto max-w-6xl animate-fade-in">
                                    <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                                        <div>
                                            <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mis Documentos</h1>
                                            <p className="font-semibold text-brandText">Gestión de certificados, facturación y archivos personales.</p>
                                        </div>
                                        <button className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/30 transition-all hover:scale-105 hover:bg-[#B38F5A]">
                                            <span className="material-symbols-outlined text-[24px] transition-transform group-hover:-translate-y-1">cloud_upload</span>
                                            Subir Archivo
                                        </button>
                                    </div>

                                    <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="group cursor-pointer rounded-[2rem] border border-gray-100 bg-[#F8F9FA] p-6 transition-all hover:border-secondary/30 hover:bg-white hover:shadow-md">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="material-symbols-outlined text-[40px] text-blue-200 transition-colors group-hover:text-secondary">folder</span>
                                                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-sm">4 Archivos</span>
                                            </div>
                                            <h3 className="text-lg font-black uppercase tracking-tight text-primary">Certificados</h3>
                                            <p className="mt-1 text-xs font-semibold text-gray-500">Aptos físicos y justificativos.</p>
                                        </div>
                                        
                                        <div className="group cursor-pointer rounded-[2rem] border border-gray-100 bg-[#F8F9FA] p-6 transition-all hover:border-secondary/30 hover:bg-white hover:shadow-md">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="material-symbols-outlined text-[40px] text-blue-200 transition-colors group-hover:text-secondary">folder</span>
                                                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-sm">12 Archivos</span>
                                            </div>
                                            <h3 className="text-lg font-black uppercase tracking-tight text-primary">Facturación</h3>
                                            <p className="mt-1 text-xs font-semibold text-gray-500">Comprobantes y copagos.</p>
                                        </div>
                                        
                                        <div className="group cursor-pointer rounded-[2rem] border border-gray-100 bg-[#F8F9FA] p-6 transition-all hover:border-secondary/30 hover:bg-white hover:shadow-md">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="material-symbols-outlined text-[40px] text-blue-200 transition-colors group-hover:text-secondary">folder_shared</span>
                                                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-sm">2 Archivos</span>
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
                                            <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-50 px-6 py-4 transition-colors hover:bg-[#F8F9FA] md:grid-cols-12 md:px-8">
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
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Certificados</span>
                                                </div>
                                                <div className="col-span-3 flex justify-start md:justify-end">
                                                    <button className="flex items-center gap-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">
                                                        <span className="material-symbols-outlined text-[18px]">download</span> Descargar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 items-center gap-4 border-b border-gray-50 px-6 py-4 transition-colors hover:bg-[#F8F9FA] md:grid-cols-12 md:px-8">
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
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gray-500">Facturación</span>
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
                            )}                        
                        </div> 
                    </div>
                </main>

                {/* SIDEBAR DERECHO */}
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

                    <div className="flex-1 bg-[#F8F9FA]">
                        {tab === 'inicio' && (
                            <div className="p-8 animate-fade-in">
                                <h2 className="mb-8 px-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Novedades</h2>
                                <NewsCards />
                            </div>
                        )}
                        {tab === 'turnos' && (
                            <div className="p-8 animate-fade-in">
                                <h2 className="mb-6 px-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Calendario</h2>
                                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-center flex flex-col items-center justify-center min-h-[250px]">
                                    <span className="material-symbols-outlined text-blue-100 text-6xl mb-4">calendar_month</span>
                                    <p className="text-sm font-black text-primary uppercase">Navegador de Fechas</p>
                                    <p className="text-xs font-semibold text-gray-400 mt-1">Próximamente</p>
                                </div>
                            </div>
                        )}
                        {(tab === 'salud' || tab === 'cartilla' || tab === 'documentos') && (
                            <div className="flex h-full items-center justify-center p-8 opacity-[0.03]">
                                <span className="material-symbols-outlined text-[120px] text-primary">local_hospital</span>
                            </div>
                        )}
                    </div>
                </aside>
                </div> {/* FIN DEL FLEX ROW DE 3 COLUMNAS */}

                <Footer />
            </div>

            {/* RENDERIZADO DEL MODAL */}
            <TurnoModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                step={modalStep} 
                setStep={setModalStep}
                turnoData={nuevoTurno}
                setTurnoData={setNuevoTurno}
                especialidadesDb={especialidades_db} // 1. Pasamos base de datos real
                medicosDb={medicos_db}               // 2. Pasamos base de datos real
                user={auth?.user}                    // 3. Pasamos usuario real
            />

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

// 4. Actualizamos Props del Modal para recibir la Data
function TurnoModal({ isOpen, onClose, step, setStep, turnoData, setTurnoData, especialidadesDb, medicosDb, user }) {
    const [searchEspecialidad, setSearchEspecialidad] = useState('');

    if (!isOpen) return null;

    // Lógica dinámica: Filtramos según lo que el usuario apretó en el paso 1
    const medicosFiltrados = medicosDb.filter(
        (medico) => medico.especialidad_id === turnoData.especialidad_id
    );

    const especialidadesFiltradas = especialidadesDb.filter(esp => 
        esp.nombre.toLowerCase().includes(searchEspecialidad.toLowerCase())
    );

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/50 p-4 sm:p-6 backdrop-blur-md animate-fade-in cursor-pointer"
            onClick={onClose}
        >
            <div 
                className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl min-h-[600px] max-h-[90vh] cursor-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header del Modal */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-[#F8F9FA] px-8 py-6">
                    <div className="flex items-center gap-4">
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)} className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-gray-200">
                                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                            </button>
                        )}
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                                Paso {step} de 4
                            </p>
                            <h2 className="text-2xl font-black tracking-tight text-primary uppercase">
                                {step === 1 && '¿Qué especialidad busca?'}
                                {step === 2 && 'Seleccione profesional'}
                                {step === 3 && 'Seleccione Fecha y Hora'}
                                {step === 4 && 'Confirmar Turno'}
                            </h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-red-50 hover:text-red-500">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                {/* Barra de progreso visual */}
                <div className="h-1.5 w-full shrink-0 bg-gray-100">
                    <div className="h-full bg-secondary transition-all duration-500 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>

                {/* Cuerpo del Modal con Scroll */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-10">
                    
                    {/* PASO 1: ESPECIALIDAD DINÁMICA */}
                    {step === 1 && (
                        <div className="animate-fade-in mx-auto w-full">
                            <div className="relative mb-8 mx-auto max-w-3xl">
                                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-[28px]">search</span>
                                <input 
                                    type="text" 
                                    value={searchEspecialidad}
                                    onChange={(e) => setSearchEspecialidad(e.target.value)}
                                    placeholder="Escriba la especialidad o síntoma (ej. Cardiología)..." 
                                    className="w-full rounded-2xl border-2 border-gray-100 bg-[#F8F9FA] py-4 pl-16 pr-6 text-base font-bold text-primary transition-all placeholder:text-gray-400 focus:border-secondary focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/10" 
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {especialidadesFiltradas.length > 0 ? (
                                    especialidadesFiltradas.map((esp) => (
                                        <button 
                                            key={esp.id}
                                            onClick={() => {
                                                setTurnoData({ ...turnoData, especialidad_id: esp.id, especialidad: esp.nombre });
                                                setStep(2);
                                            }}
                                            className="group flex flex-col items-start justify-center rounded-2xl border border-gray-100 bg-white p-5 text-left transition-all hover:-translate-y-1 hover:border-secondary/50 hover:bg-blue-50/30 hover:shadow-md"
                                        >
                                            <div className="flex w-full items-center justify-between mb-2">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-white group-hover:text-secondary">
                                                    <span className="material-symbols-outlined">medical_services</span>
                                                </div>
                                                <span className="material-symbols-outlined text-gray-200 transition-transform group-hover:translate-x-1 group-hover:text-secondary">arrow_forward</span>
                                            </div>
                                            <span className="text-sm font-black uppercase tracking-tight text-primary leading-tight">{esp.nombre}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-full py-8 text-center text-gray-500 font-semibold">
                                        No se encontraron especialidades con ese nombre.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PASO 2: PROFESIONAL DINÁMICO */}
                    {step === 2 && (
                        <div className="animate-fade-in w-full max-w-5xl mx-auto">
                            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md">
                                        <span className="material-symbols-outlined text-[32px]">person_search</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-primary tracking-tight uppercase">Seleccione profesional</h3>
                                        <p className="text-sm font-semibold text-gray-500 mt-1">
                                            Especialidad elegida: <span className="font-black text-secondary uppercase tracking-widest">{turnoData.especialidad}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                
                                {/* Mapeo de Médicos Filtrados */}
                                {medicosFiltrados.length > 0 ? (
                                    medicosFiltrados.map((prof) => (
                                        <button
                                            key={prof.id}
                                            disabled={prof.turnos_disponibles === 0}
                                            onClick={() => {
                                                setTurnoData({ ...turnoData, medico_id: prof.id, medico: `${prof.apellido}, ${prof.nombre}` });
                                                setStep(3);
                                            }}
                                            className={`flex items-center gap-5 rounded-2xl border p-5 text-left transition-all ${
                                                prof.turnos_disponibles === 0 
                                                ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' 
                                                : 'border-gray-200 bg-white hover:border-secondary/50 hover:shadow-md'
                                            }`}
                                        >
                                            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 ${prof.turnos_disponibles === 0 ? 'border-gray-200 bg-gray-200 text-gray-400' : 'border-primary bg-blue-50 text-primary'}`}>
                                                <span className="material-symbols-outlined text-[28px]">person</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Dr/a</p>
                                                <p className={`text-base font-black uppercase leading-tight ${prof.turnos_disponibles === 0 ? 'text-gray-500' : 'text-primary'}`}>
                                                    {prof.apellido}, {prof.nombre}
                                                </p>
                                                <p className={`mt-1.5 text-[11px] font-black uppercase tracking-widest ${prof.turnos_disponibles === 0 ? 'text-red-400' : 'text-secondary'}`}>
                                                    {prof.turnos_disponibles === 0 ? 'Sin disponibilidad actual' : `Turnos disponibles: ${prof.turnos_disponibles}`}
                                                </p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-1 md:col-span-2 text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-gray-500 font-semibold">No hay médicos cargados para esta especialidad todavía.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PASO 3: FECHA Y HORA */}
                    {step === 3 && (
                        <div className="animate-fade-in w-full max-w-5xl mx-auto">
                            <div className="mb-8 rounded-2xl bg-[#F8F9FA] border border-gray-100 p-5 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resumen parcial</p>
                                    <p className="text-sm font-black text-primary uppercase mt-1">
                                        {turnoData.especialidad} <span className="text-secondary mx-2">•</span> {turnoData.medico}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                
                                {/* Lado Izquierdo: Selección de Fecha */}
                                <div>
                                    <h3 className="mb-6 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-primary">
                                        <span className="material-symbols-outlined text-secondary text-[24px]">calendar_month</span>
                                        1. Elija el día
                                    </h3>
                                    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                                        <p className="text-center text-sm font-semibold text-gray-400 mb-4">Mayo 2026</p>
                                        <div className="grid grid-cols-5 gap-3">
                                            {[14, 15, 18, 19, 20, 21, 22].map((dia) => (
                                                <button 
                                                    key={dia}
                                                    onClick={() => setTurnoData({ ...turnoData, fecha: `${dia} de Mayo` })}
                                                    className={`flex flex-col items-center justify-center rounded-2xl py-3 transition-all ${
                                                        turnoData.fecha === `${dia} de Mayo`
                                                        ? 'bg-primary text-white shadow-md'
                                                        : 'bg-[#F8F9FA] text-primary hover:bg-secondary/10 hover:text-secondary'
                                                    }`}
                                                >
                                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Mie</span>
                                                    <span className="text-xl font-black leading-none">{dia}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Lado Derecho: Selección de Hora */}
                                <div className={`transition-opacity duration-300 ${!turnoData.fecha ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                                    <h3 className="mb-6 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-primary">
                                        <span className="material-symbols-outlined text-secondary text-[24px]">schedule</span>
                                        2. Horarios disponibles
                                    </h3>
                                    
                                    {!turnoData.fecha ? (
                                        <div className="flex h-40 items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-[#F8F9FA]">
                                            <p className="text-sm font-semibold text-gray-400">Seleccione un día primero</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div>
                                                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Turno Mañana</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {['09:00', '09:30', '10:15', '11:00'].map(hora => (
                                                        <button 
                                                            key={hora}
                                                            onClick={() => {
                                                                setTurnoData({ ...turnoData, hora });
                                                                setStep(4);
                                                            }}
                                                            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-black text-primary transition-all hover:border-secondary hover:bg-secondary/5 hover:text-secondary"
                                                        >
                                                            {hora}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Turno Tarde</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {['14:00', '15:30', '16:00'].map(hora => (
                                                        <button 
                                                            key={hora}
                                                            onClick={() => {
                                                                setTurnoData({ ...turnoData, hora });
                                                                setStep(4);
                                                            }}
                                                            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-black text-primary transition-all hover:border-secondary hover:bg-secondary/5 hover:text-secondary"
                                                        >
                                                            {hora}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASO 4: CONFIRMACIÓN PREMIUM */}
                    {step === 4 && (
                        <div className="animate-fade-in mx-auto w-full max-w-4xl py-2">
                            
                            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border-2 border-red-100 bg-red-50 p-5 text-left shadow-sm max-w-3xl mx-auto">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                                    <span className="material-symbols-outlined text-[28px]">warning</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-relaxed text-red-700">
                                        Por favor, verificá que todos los datos sean correctos antes de continuar. Una vez revisados, debés presionar el botón <span className="font-black">“Confirmar turno”</span> que se encuentra al final de la pantalla.
                                    </p>
                                </div>
                            </div>

                            <h3 className="font-black text-2xl uppercase text-primary tracking-tight mb-8 text-center">Resumen del Turno</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10 text-left">
                                
                                {/* Detalles de la Cita */}
                                <div className="rounded-[24px] border border-gray-200 bg-white p-6 lg:p-8 shadow-sm transition-all hover:shadow-md flex flex-col">
                                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-primary">Detalles de la Cita</h4>
                                    </div>
                                    <div className="mb-6 rounded-2xl bg-[#F8F9FA] p-4 border border-gray-100 flex items-center gap-5">
                                        <div className="flex flex-col items-center justify-center border-r border-gray-200 pr-5 min-w-[80px]">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Día</span>
                                            <span className="text-2xl font-black text-secondary leading-none">
                                                {turnoData.fecha ? turnoData.fecha.split(' ')[0] : '--'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-primary">{turnoData.hora} hs</p>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{turnoData.fecha}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 flex-1">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Especialidad</p>
                                            <p className="text-sm font-black text-primary leading-snug">{turnoData.especialidad}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Profesional</p>
                                            <p className="text-sm font-black text-primary leading-snug">{turnoData.medico}</p>
                                        </div>
                                        <div className="col-span-2 mt-auto pt-4 border-t border-gray-50">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Lugar de Atención</p>
                                            <p className="text-sm font-bold text-primary">Sede Central <span className="text-gray-400 font-medium">| Paso de los Andes 3051</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Datos del Paciente Dinámicos */}
                                <div className="rounded-[24px] border border-gray-200 bg-white p-6 lg:p-8 shadow-sm transition-all hover:shadow-md flex flex-col">
                                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary">
                                            <span className="material-symbols-outlined text-[20px]">badge</span>
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-primary">Identidad del Paciente</h4>
                                    </div>
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                            <span className="material-symbols-outlined text-[28px]">person</span>
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-primary uppercase leading-tight">
                                                {user?.last_name}, {user?.name}
                                            </p>
                                            <p className="text-xs font-bold text-gray-400 mt-0.5">DNI: {user?.dni}</p>
                                        </div>
                                    </div>
                                    <div className="mb-6 rounded-xl bg-[#F8F9FA] p-4 border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Cobertura Médica</p>
                                            <p className="text-sm font-black text-primary">
                                                {user?.obra_social || 'Particular'} {user?.plan ? `(Plan ${user?.plan})` : ''}
                                            </p>
                                        </div>
                                        <div className="text-right border-l border-gray-200 pl-4">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Nro. Afiliado</p>
                                            <p className="text-sm font-black text-primary">Autogenerado</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-auto pt-2 border-t border-gray-50">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email Registrado</p>
                                            <p className="text-xs font-bold text-primary truncate">{user?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Teléfono</p>
                                            <p className="text-xs font-bold text-primary truncate">{user?.phone || 'No registrado'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-gray-100 pt-8">
                                <button 
                                    onClick={() => setStep(3)} 
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-200 text-sm font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors"
                                >
                                    Volver a editar
                                </button>
                                <button 
                                    onClick={() => {
                                        // Enviamos los datos al backend vía Inertia
                                        router.post(route('turnos.store'), {
                                            especialidad_id: turnoData.especialidad_id,
                                            medico_id: turnoData.medico_id,
                                            fecha: turnoData.fecha,
                                            hora: turnoData.hora
                                        }, {
                                            preserveScroll: true, // Evita que la página salte al inicio
                                            onSuccess: () => {
                                                onClose(); // Cierra el modal solo si todo salió bien
                                            }
                                        });
                                    }} 
                                    className="w-full sm:w-auto px-10 py-4 bg-secondary shadow-lg shadow-secondary/30 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:scale-105 hover:bg-[#B38F5A] transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                    Confirmar Turno
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="mt-auto shrink-0 border-t border-white/10 bg-primary px-8 py-12 text-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-4 lg:gap-8">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-normal tracking-wide">Hospital Universitario</h3>
                    <p className="mb-6 font-black uppercase tracking-widest text-secondary">Salud UNCUYO</p>
                    <div className="space-y-1.5 text-[13px] text-blue-100">
                        <p>Paso de los Andes 3051, (M5502BLI)</p>
                        <p>Mendoza, Argentina</p>
                        <p>Informes: 5644011</p>
                        <p>Número para atención telefónica: 261-5644000.</p>
                        <p>Informes y conmutador general del HU</p>
                        <p>De lunes a viernes de 8 a 20 horas.</p>
                        <p>Correo electrónico: <a href="mailto:info@hospital.uncu.edu.ar" className="hover:text-white hover:underline">info@hospital.uncu.edu.ar</a></p>
                        <p>Turnos por WhatsApp: <span className="font-bold text-white">261 205 3408</span></p>
                    </div>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-100">
                            <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-white">
                                <span className="material-symbols-outlined text-[18px]">public</span> Facebook
                            </a>
                            <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-white">
                                <span className="material-symbols-outlined text-[18px]">public</span> Twitter
                            </a>
                            <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-white">
                                <span className="material-symbols-outlined text-[18px]">smart_display</span> Youtube
                            </a>
                            <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-white">
                                <span className="material-symbols-outlined text-[18px]">work</span> LinkedIn
                            </a>
                            <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-white">
                                <span className="material-symbols-outlined text-[18px]">photo_camera</span> Instagram
                            </a>
                        </div>
                        <a href="#" className="flex w-fit items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/10">
                            <span className="material-symbols-outlined text-[18px]">mail</span> Suscripción a boletín
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-[13px] text-blue-100">
                    <a href="#" className="transition-colors hover:text-white hover:underline">Cursos</a>
                    <a href="#" className="transition-colors hover:text-white hover:underline">Contacto</a>
                </div>
                <div className="flex flex-col gap-3 text-[13px] text-blue-100">
                    <a href="#" className="transition-colors hover:text-white hover:underline">Preguntas frecuentes</a>
                    <a href="#" className="transition-colors hover:text-white hover:underline">Trámites</a>
                </div>
                <div className="flex flex-col gap-3 text-[13px] text-blue-100">
                    <a href="#" className="transition-colors hover:text-white hover:underline">Mapa del sitio</a>
                    <a href="#" className="transition-colors hover:text-white hover:underline">Defensoría Estudiantil</a>
                </div>
            </div>
        </footer>
    );
}