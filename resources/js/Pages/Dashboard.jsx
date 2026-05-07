import { useState, useMemo, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';

// Importamos nuestros componentes modulares
import SeccionInicio from '@/Components/Dashboard/SeccionInicio.jsx';
import SeccionTurnos from '@/Components/Dashboard/SeccionTurnos.jsx';
import SeccionSalud from '@/Components/Dashboard/SeccionSalud.jsx';
import SeccionCartilla from '@/Components/Dashboard/SeccionCartilla.jsx';
import SeccionBiblioteca from '@/Components/Dashboard/SeccionBiblioteca.jsx';

export default function Dashboard({ auth, turnos = [], especialidades_db = [], medicos_db = [] }) {
    const [tab, setTab] = useState('inicio');
    
    // --- ESTADOS DEL BUSCADOR OPTIMIZADO ---
    const [globalSearchInput, setGlobalSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    
    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { post } = useForm();

    const userName = auth?.user?.name ?? 'Paciente';

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(globalSearchInput);
        }, 300);
        return () => clearTimeout(handler);
    }, [globalSearchInput]);

    const searchResults = useMemo(() => {
        if (debouncedSearch.length < 2) return { especialidades: [], medicos: [] };
        const searchLower = debouncedSearch.toLowerCase();
        
        return {
            especialidades: especialidades_db.filter(e => e.nombre.toLowerCase().includes(searchLower)),
            medicos: medicos_db.filter(m => (m.nombre + ' ' + m.apellido).toLowerCase().includes(searchLower))
        };
    }, [debouncedSearch, especialidades_db, medicos_db]);

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
        { id: 'biblioteca', label: 'Biblioteca', icon: 'folder_open' },
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
        return `flex w-full items-center gap-4 rounded-xl border-l-4 px-4 py-3.5 text-left transition-colors ${
            active
                ? 'border-secondary bg-[#F4F7F9] text-primary shadow-sm'
                : 'border-transparent text-brandText hover:bg-[#F4F7F9]/50 hover:shadow-sm'
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

    const renderProfileMenu = (align = 'right-0', margin = 'top-14') => (
        profileOpen && (
            <div className={`absolute ${margin} ${align} z-50 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-2xl animate-fade-in`}>
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

    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleCancelarTurno = (id) => {
        if (window.confirm('¿Estás seguro de que querés cancelar este turno? Esta acción no se puede deshacer.')) {
            router.delete(route('turnos.destroy', id), {
                preserveScroll: true,
                onSuccess: () => setToast('Turno cancelado correctamente.'),
            });
        }
    };

    return (
        <div className="min-h-screen bg-primary p-3 font-sans antialiased lg:p-4 relative">
            <Head title="Inicio | Hospital Universitario" />

            <div className="mx-auto flex flex-col min-h-[calc(100vh-1.5rem)] w-full max-w-[1900px] overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:min-h-[calc(100vh-2rem)]">
                
                <div className="flex flex-1 w-full min-h-[calc(100vh-1.5rem)] lg:min-h-[calc(100vh-2rem)]">
                    
                    {/* SIDEBAR IZQUIERDO: Con el botón global */}
                    <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-100 bg-white p-8 lg:flex relative z-20 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.05)]">
                        <div className="mb-12 flex justify-center px-2">
                            <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-full" />
                        </div>

                        {/* --- BOTÓN GLOBAL: NUEVO TURNO --- */}
                        <div className="mb-10 pr-2">
                            <button 
                                onClick={() => { setModalStep(1); setIsModalOpen(true); }} 
                                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-4 py-4 text-[12px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30 transition-[background-color,color,shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[#00284A] hover:text-[#C7A36E] hover:shadow-2xl hover:shadow-[#00284A]/40"
                            >
                                <span className="material-symbols-outlined text-[24px] transition-transform duration-300 group-hover:scale-110">calendar_add_on</span>
                                Nuevo Turno
                            </button>
                        </div>

                        <div className="flex-1 pr-2">
                            <p className="mb-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Menú Principal</p>
                            {renderNavigation()}
                        </div>
                    </aside>

                    <div className="flex min-w-0 flex-1 flex-col bg-[#F4F7F9]">
                        
                        <header className="relative z-30 shrink-0 border-b border-gray-100 bg-white px-5 py-4 lg:px-12 lg:py-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
                                <button type="button" onClick={() => setMobileMenu((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F9FA] text-primary transition-colors hover:bg-gray-100">
                                    <span className="material-symbols-outlined">{mobileMenu ? 'close' : 'menu'}</span>
                                </button>
                                <img src="/img/Logo HU Uso Diario.svg" alt="Logo" className="h-auto w-32" />
                                <div className="relative">
                                    <button type="button" onClick={() => setProfileOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl aspect-square bg-primary font-black text-white shadow-md">
                                        {userName.substring(0, 1)}
                                    </button>
                                    {renderProfileMenu()}
                                </div>
                            </div>

                            {mobileMenu && (
                                <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-3 lg:hidden shadow-sm">
                                    {renderNavigation()}
                                </div>
                            )}

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 w-full">
                                <div className="relative w-full max-w-2xl z-50">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    <input 
                                        type="text" 
                                        value={globalSearchInput} 
                                        onChange={(e) => setGlobalSearchInput(e.target.value)}
                                        placeholder="Buscar médico, especialidad..." 
                                        className="w-full rounded-2xl border border-gray-100 bg-[#F4F7F9] py-3.5 pl-12 pr-12 text-sm font-semibold text-primary transition-colors placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary/20 shadow-inner" 
                                    />
                                    {globalSearchInput && (
                                        <button 
                                            onClick={() => {
                                                setGlobalSearchInput('');
                                                setDebouncedSearch('');
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">cancel</span>
                                        </button>
                                    )}

                                    {debouncedSearch.length > 1 && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-[400px] overflow-y-auto">
                                            {searchResults.especialidades.map(esp => (
                                                <button key={`esp-${esp.id}`} onClick={() => {
                                                    setTab('cartilla');
                                                    setGlobalSearchInput('');
                                                    setDebouncedSearch('');
                                                }} className="w-full text-left px-5 py-3 hover:bg-[#F4F7F9] flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors">
                                                    <span className="material-symbols-outlined text-secondary">medical_services</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-primary">{esp.nombre}</p>
                                                        <p className="text-[10px] uppercase tracking-widest text-gray-400">Especialidad</p>
                                                    </div>
                                                </button>
                                            ))}
                                            {searchResults.medicos.map(med => (
                                                <button key={`med-${med.id}`} onClick={() => {
                                                    setTab('cartilla');
                                                    setGlobalSearchInput('');
                                                    setDebouncedSearch('');
                                                }} className="w-full text-left px-5 py-3 hover:bg-[#F4F7F9] flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors">
                                                    <span className="material-symbols-outlined text-secondary">person</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-primary">Dr/a. {med.apellido}, {med.nombre}</p>
                                                        <p className="text-[10px] uppercase tracking-widest text-gray-400">Médico</p>
                                                    </div>
                                                </button>
                                            ))}
                                            {searchResults.especialidades.length === 0 && searchResults.medicos.length === 0 && (
                                                <div className="px-5 py-6 text-center text-sm font-semibold text-gray-500">
                                                    No se encontraron resultados para "{debouncedSearch}"
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="hidden lg:flex items-center gap-5">
                                    <button type="button" className="group relative flex h-10 w-10 items-center justify-center rounded-xl aspect-square bg-[#F4F7F9] text-gray-400 transition-colors hover:text-primary shadow-inner">
                                        <span className="material-symbols-outlined">notifications</span>
                                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-red-500"></span>
                                    </button>
                                    <div className="h-8 w-px bg-gray-100"></div>
                                    <div className="text-right">
                                        <p className="text-[13px] font-black uppercase leading-none text-primary">{userName}</p>
                                        <p className="mt-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-secondary">Paciente</p>
                                    </div>
                                    <div className="relative">
                                        <button type="button" onClick={() => setProfileOpen((value) => !value)} className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl aspect-square bg-primary font-black text-white shadow-md transition-transform hover:scale-105">
                                            {userName.substring(0, 1)}
                                        </button>
                                        {renderProfileMenu('right-0', 'top-[60px]')}
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="flex flex-1 relative">
                            <main className="flex-1 p-5 lg:p-12 w-full">
                                {tab === 'inicio' && <SeccionInicio userName={userName} turnosFuturos={turnosFuturos} handleCancelarTurno={handleCancelarTurno} setTab={setTab} />}
                                {tab === 'turnos' && <SeccionTurnos turnosFuturos={turnosFuturos} turnosPasados={turnosPasados} handleCancelarTurno={handleCancelarTurno} />}
                                {tab === 'salud' && <SeccionSalud />}
                                {tab === 'cartilla' && <SeccionCartilla especialidadesDb={especialidades_db} medicosDb={medicos_db} setIsModalOpen={setIsModalOpen} setNuevoTurno={setNuevoTurno} nuevoTurno={nuevoTurno} setModalStep={setModalStep} />}
                                {tab === 'biblioteca' && <SeccionBiblioteca />}
                            </main> 

                            {tab === 'inicio' && (
                                <aside className="hidden w-80 shrink-0 flex-col border-l border-gray-100 bg-white xl:flex z-20 shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)] overflow-y-auto">
                                    <div className="p-8 animate-fade-in">
                                        <h2 className="mb-6 px-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-2">Novedades</h2>
                                        <NewsCards />
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            <TurnoModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                step={modalStep} 
                setStep={setModalStep}
                turnoData={nuevoTurno}
                setTurnoData={setNuevoTurno}
                especialidadesDb={especialidades_db}
                medicosDb={medicos_db}
                user={auth?.user}
                setToast={setToast}
            />

            {toast && (
                <div className="fixed bottom-6 right-6 z-[200] flex animate-fade-in items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-white shadow-2xl">
                    <span className="material-symbols-outlined">check_circle</span>
                    <p className="text-sm font-black uppercase tracking-widest">{toast}</p>
                    <button onClick={() => setToast(null)} className="ml-2 hover:text-emerald-100">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            )}
        </div>
    );
}

function NewsCards() {
    return (
        <div className="space-y-4">
            <article className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md">
                <span className="mb-3 inline-block rounded bg-secondary/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-secondary">Salud</span>
                <h4 className="mb-2 text-sm font-black uppercase leading-snug text-primary transition-colors group-hover:text-secondary">Campaña Antigripal 2026.</h4>
                <p className="text-xs font-medium leading-relaxed text-gray-400">Conozca los horarios en sede central.</p>
            </article>
            <article className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-[border-color,shadow] hover:border-secondary/30 hover:shadow-md">
                <h4 className="mb-2 text-sm font-black uppercase leading-snug text-primary transition-colors group-hover:text-secondary">Nuevos profesionales.</h4>
                <p className="text-xs font-medium leading-relaxed text-gray-400">Se incorpora equipo en cardiología infantil.</p>
            </article>
        </div>
    );
}

function TurnoModal({ isOpen, onClose, step, setStep, turnoData, setTurnoData, especialidadesDb, medicosDb, user, setToast }) {
    const [searchEspecialidad, setSearchEspecialidad] = useState('');

    if (!isOpen) return null;

    const medicosFiltrados = medicosDb.filter(
        (medico) => medico.especialidad_id === turnoData.especialidad_id
    );

    const especialidadesFiltradas = especialidadesDb.filter(esp => 
        esp.nombre.toLowerCase().includes(searchEspecialidad.toLowerCase())
    );

    const canContinue = () => {
        if (step === 1) return turnoData.especialidad_id !== null;
        if (step === 2) return turnoData.medico_id !== null;
        if (step === 3) return turnoData.fecha !== null && turnoData.hora !== null;
        return true;
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/50 p-4 sm:p-6 backdrop-blur-md animate-fade-in cursor-pointer"
            onClick={onClose}
        >
            <div 
                className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl h-[85vh] cursor-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-[#F4F7F9] px-8 py-6">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary mb-1">Paso {step} de 4</p>
                        <h2 className="text-2xl font-black tracking-tight text-primary uppercase">
                            {step === 1 && '¿Qué especialidad busca?'}
                            {step === 2 && 'Seleccione profesional'}
                            {step === 3 && 'Seleccione Fecha y Hora'}
                            {step === 4 && 'Confirmar Turno'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500 border border-gray-100">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                <div className="h-1.5 w-full shrink-0 bg-gray-100">
                    <div className="h-full bg-secondary transition-all duration-500 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 lg:p-10 bg-white">
                    
                    {step === 1 && (
                        <div className="animate-fade-in mx-auto w-full">
                            <div className="relative mb-8 mx-auto max-w-3xl">
                                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-[28px]">search</span>
                                <input 
                                    type="text" 
                                    value={searchEspecialidad}
                                    onChange={(e) => setSearchEspecialidad(e.target.value)}
                                    placeholder="Escriba la especialidad o síntoma (ej. Cardiología)..." 
                                    className="w-full rounded-2xl border-2 border-gray-100 bg-[#F4F7F9] py-4 pl-16 pr-6 text-base font-bold text-primary transition-colors placeholder:text-gray-400 focus:border-secondary/50 focus:bg-white focus:outline-none shadow-inner" 
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {especialidadesFiltradas.length > 0 ? (
                                    especialidadesFiltradas.map((esp) => (
                                        <button 
                                            key={esp.id}
                                            onClick={() => setTurnoData({ ...turnoData, especialidad_id: esp.id, especialidad: esp.nombre, medico_id: null, medico: null })}
                                            className={`group flex flex-col items-start justify-center rounded-xl border-2 p-5 text-left transition-[border-color,background-color,transform] hover:-translate-y-1 ${
                                                turnoData.especialidad_id === esp.id 
                                                ? 'border-secondary bg-blue-50/50 shadow-md' 
                                                : 'border-transparent border-gray-100 bg-[#F4F7F9] hover:bg-white hover:border-secondary/30 hover:shadow-sm'
                                            }`}
                                        >
                                            <div className="flex w-full items-center justify-between mb-2">
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${turnoData.especialidad_id === esp.id ? 'bg-secondary text-white' : 'bg-white shadow-sm text-gray-400'}`}>
                                                    <span className="material-symbols-outlined">medical_services</span>
                                                </div>
                                                {turnoData.especialidad_id === esp.id && <span className="material-symbols-outlined text-secondary">check_circle</span>}
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
                                {medicosFiltrados.length > 0 ? (
                                    medicosFiltrados.map((prof) => (
                                        <button
                                            key={prof.id}
                                            disabled={prof.turnos_disponibles === 0}
                                            onClick={() => setTurnoData({ ...turnoData, medico_id: prof.id, medico: `${prof.apellido}, ${prof.nombre}` })}
                                            className={`flex items-center gap-5 rounded-xl border-2 p-5 text-left transition-[border-color,background-color] ${
                                                prof.turnos_disponibles === 0 
                                                ? 'border-gray-100 bg-[#F4F7F9] opacity-60 cursor-not-allowed' 
                                                : turnoData.medico_id === prof.id
                                                    ? 'border-secondary bg-blue-50/50 shadow-md'
                                                    : 'border-transparent border-gray-100 bg-[#F4F7F9] hover:bg-white hover:border-secondary/30 hover:shadow-sm'
                                            }`}
                                        >
                                            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${turnoData.medico_id === prof.id ? 'border-secondary bg-secondary text-white' : 'border-primary bg-white shadow-sm text-primary'}`}>
                                                <span className="material-symbols-outlined text-[28px]">person</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Dr/a</p>
                                                <p className={`text-base font-black uppercase leading-tight transition-colors ${prof.turnos_disponibles === 0 ? 'text-gray-500' : 'text-primary'}`}>
                                                    {prof.apellido}, {prof.nombre}
                                                </p>
                                                <p className={`mt-1.5 text-[11px] font-black uppercase tracking-widest transition-colors ${prof.turnos_disponibles === 0 ? 'text-red-400' : 'text-secondary'}`}>
                                                    {prof.turnos_disponibles === 0 ? 'Sin disponibilidad actual' : `Turnos disponibles: ${prof.turnos_disponibles}`}
                                                </p>
                                            </div>
                                            {turnoData.medico_id === prof.id && <span className="material-symbols-outlined text-secondary">check_circle</span>}
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-1 md:col-span-2 text-center p-8 bg-[#F4F7F9] rounded-2xl border border-gray-100">
                                        <p className="text-gray-500 font-semibold">No hay médicos cargados para esta especialidad todavía.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in w-full max-w-5xl mx-auto">
                            <div className="mb-8 rounded-xl bg-[#F4F7F9] border border-gray-100 p-5 flex flex-wrap items-center justify-between gap-4 shadow-inner">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resumen parcial</p>
                                    <p className="text-sm font-black text-primary uppercase mt-1">
                                        {turnoData.especialidad} <span className="text-secondary mx-2">•</span> {turnoData.medico}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                                                    onClick={() => setTurnoData({ ...turnoData, fecha: `${dia} de Mayo`, hora: null })}
                                                    className={`flex flex-col items-center justify-center rounded-xl py-3 transition-colors ${
                                                        turnoData.fecha === `${dia} de Mayo`
                                                        ? 'bg-primary text-white shadow-md'
                                                        : 'bg-[#F4F7F9] text-primary hover:bg-secondary/10 hover:text-secondary shadow-inner'
                                                    }`}
                                                >
                                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">May</span>
                                                    <span className="text-xl font-black leading-none">{dia}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={`transition-opacity duration-300 ${!turnoData.fecha ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                                    <h3 className="mb-6 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-primary">
                                        <span className="material-symbols-outlined text-secondary text-[24px]">schedule</span>
                                        2. Horarios disponibles
                                    </h3>
                                    
                                    {!turnoData.fecha ? (
                                        <div className="flex h-40 items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-[#F4F7F9]">
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
                                                            onClick={() => setTurnoData({ ...turnoData, hora })}
                                                            className={`rounded-xl border px-5 py-2.5 text-sm font-black transition-colors ${turnoData.hora === hora ? 'border-secondary bg-secondary text-white shadow-md' : 'border-gray-200 bg-[#F4F7F9] text-primary hover:border-secondary hover:bg-white'}`}
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
                                                            onClick={() => setTurnoData({ ...turnoData, hora })}
                                                            className={`rounded-xl border px-5 py-2.5 text-sm font-black transition-colors ${turnoData.hora === hora ? 'border-secondary bg-secondary text-white shadow-md' : 'border-gray-200 bg-[#F4F7F9] text-primary hover:border-secondary hover:bg-white'}`}
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

                    {step === 4 && (
                        <div className="animate-fade-in mx-auto w-full max-w-4xl py-2">
                            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 text-left shadow-sm max-w-3xl mx-auto">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-red-500 shadow-sm border border-red-100">
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
                                <div className="rounded-[24px] border border-gray-100 bg-white p-6 lg:p-8 shadow-sm transition-[shadow] hover:shadow-md flex flex-col">
                                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-primary">Detalles de la Cita</h4>
                                    </div>
                                    <div className="mb-6 rounded-xl bg-[#F4F7F9] shadow-inner p-4 border border-gray-100 flex items-center gap-5">
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

                                <div className="rounded-[24px] border border-gray-100 bg-white p-6 lg:p-8 shadow-sm transition-[shadow] hover:shadow-md flex flex-col">
                                    <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary">
                                            <span className="material-symbols-outlined text-[20px]">badge</span>
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-primary">Identidad del Paciente</h4>
                                    </div>
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-gray-400">
                                            <span className="material-symbols-outlined text-[28px]">person</span>
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-primary uppercase leading-tight">
                                                {user?.last_name}, {user?.name}
                                            </p>
                                            <p className="text-xs font-bold text-gray-400 mt-0.5">DNI: {user?.dni || '20.123.456'}</p>
                                        </div>
                                    </div>
                                    <div className="mb-6 rounded-xl bg-[#F4F7F9] shadow-inner p-4 border border-gray-100 flex justify-between items-center">
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
                        </div>
                    )}
                </div>

                <div className="shrink-0 border-t border-gray-100 bg-white px-8 py-5 flex items-center justify-between">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-500 transition-colors hover:bg-[#F4F7F9] shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span> Volver
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {step < 4 ? (
                        <button 
                            disabled={!canContinue()} 
                            onClick={() => setStep(step + 1)} 
                            className={`flex items-center gap-2 rounded-full px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors duration-300 ${
                                canContinue() ? 'bg-primary hover:bg-[#00284A] shadow-lg shadow-primary/30' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            Continuar <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    ) : (
                        <button 
                            onClick={() => {
                                router.post(route('turnos.store'), turnoData, {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        onClose(); 
                                        setToast('¡Turno confirmado con éxito!');
                                    }
                                });
                            }} 
                            className="flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-[background-color,transform] hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 hover:-translate-y-1"
                        >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span> Confirmar Turno
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="mt-auto shrink-0 border-t border-white/10 bg-primary px-8 py-12 text-white relative z-20">
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