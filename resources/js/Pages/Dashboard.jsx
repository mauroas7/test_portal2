import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, turnos = [] }) {
    const [tab, setTab] = useState('agenda');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { post } = useForm();

    const userName = auth?.user?.name ?? 'Paciente';

    const menuItems = [
        { id: 'agenda', label: 'Mi agenda', icon: 'calendar_month' },
        { id: 'BBB', label: 'Estudios', icon: 'stethoscope' },
        { id: 'CCC', label: 'Historial', icon: 'event' },
        { id: 'DDD', label: 'Grupo Familiar', icon: 'group' },
        { id: 'EEE', label: 'Recetas', icon: 'medication' },
        { id: 'FFF', label: 'Laboratorio', icon: 'science' },
        { id: 'GGG', label: 'Archivos', icon: 'cloud_upload' },
        { id: 'HHH', label: 'Facturación', icon: 'library_books' },
        { id: 'III', label: 'Consentimientos', icon: 'edit_note' },
    ];

    const handleTabChange = (item) => {
        setTab(item.id);
        setMobileMenu(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post('/logout');
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

            <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1900px] overflow-hidden rounded-3xl bg-white shadow-2xl lg:min-h-[calc(100vh-2rem)]">
                <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-100 bg-[#F8F9FA] p-8 lg:flex">
                    <div className="mb-12 flex justify-center px-2">
                        <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-44" />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2">
                        <p className="mb-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            Menú Principal
                        </p>
                        {renderNavigation()}
                    </div>
                </aside>

                <main className="flex min-w-0 flex-1 flex-col bg-white">
                    <header className="shrink-0 border-b border-gray-50 px-5 py-4 lg:px-12 lg:py-6">
                        <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenu((value) => !value)}
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F9FA] text-primary transition-colors hover:bg-gray-100"
                                aria-label="Abrir menú"
                                aria-expanded={mobileMenu}
                            >
                                <span className="material-symbols-outlined">{mobileMenu ? 'close' : 'menu'}</span>
                            </button>

                            <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-32" />

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen((value) => !value)}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-black text-white shadow-md transition-transform hover:scale-105"
                                    aria-label="Abrir perfil"
                                >
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
                            <input
                                type="text"
                                placeholder="Buscar médico, especialidad, estudios..."
                                className="w-full rounded-2xl border-none bg-[#F8F9FA] py-3.5 pl-12 pr-4 text-sm font-semibold text-primary transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-secondary/20"
                            />
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto bg-white p-5 lg:p-12">
                        {tab === 'agenda' && (
                            <div className="mx-auto max-w-6xl">
                                <div className="mb-8 lg:mb-10">
                                    <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl">Mi agenda médica</h1>
                                    <p className="font-semibold text-brandText">Bienvenido al portal de autogestión de pacientes.</p>
                                </div>

                                <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:mb-12 lg:flex">
                                    <button className="flex items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]">
                                        <span className="material-symbols-outlined">calendar_add_on</span>
                                        Solicitar Nuevo Turno
                                    </button>
                                    <button className="flex items-center justify-center gap-3 rounded-2xl bg-[#F8F9FA] px-6 py-4 text-[11px] font-black uppercase tracking-widest text-primary transition-colors hover:bg-gray-100">
                                        <span className="material-symbols-outlined">add_circle</span>
                                        Crear Recordatorio
                                    </button>
                                </div>

                                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                                    <div className="hidden grid-cols-3 border-b border-gray-100 bg-[#F8F9FA] px-10 py-5 md:grid">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Tipo de Consulta</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brandText">Fecha Programada</span>
                                        <span className="text-center text-[10px] font-black uppercase tracking-widest text-brandText">Estado</span>
                                    </div>

                                    {turnos.length > 0 ? (
                                        <div className="flex flex-col">
                                            {turnos.map((turno) => (
                                                <div key={turno.id} className="grid gap-4 border-b border-gray-50 px-6 py-5 transition-colors hover:bg-[#F8F9FA] md:grid-cols-3 md:items-center md:px-10 md:py-6">
                                                    <div>
                                                        <p className="text-sm font-black uppercase text-primary">{turno.especialidad}</p>
                                                        <p className="mt-1 text-xs font-semibold text-gray-400">Dr/a. {turno.medico_nombre}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-brandText">
                                                            {new Date(turno.fecha_hora).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                        </p>
                                                        <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-secondary">
                                                            {new Date(turno.fecha_hora).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs
                                                        </p>
                                                    </div>
                                                    <div className="flex md:justify-center">
                                                        <span className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                                                            turno.estado === 'pendiente' ? 'bg-amber-100 text-amber-700' :
                                                            turno.estado === 'confirmado' ? 'bg-green-100 text-green-700' :
                                                            'bg-gray-100 text-gray-500'
                                                        }`}>
                                                            {turno.estado}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex min-h-[360px] flex-1 flex-col items-center justify-center p-8 text-center lg:min-h-[450px] lg:p-12">
                                            <img src="/img/medical-care.svg" alt="No hay turnos" className="mb-8 h-auto w-56 opacity-90 lg:w-72" />
                                            <h3 className="mb-2 text-2xl font-black tracking-tight text-primary">No hay turnos pendientes</h3>
                                            <p className="text-sm font-semibold text-gray-400">Tus citas programadas aparecerán en esta lista.</p>
                                        </div>
                                    )}
                                </div>

                                <section className="mt-8 rounded-3xl bg-[#F8F9FA] p-5 xl:hidden">
                                    <h2 className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Novedades</h2>
                                    <NewsCards />
                                </section>
                            </div>
                        )}

                        {tab === 'BBB' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Estudios en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'CCC' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Historial en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'DDD' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Grupo Familiar en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'EEE' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Recetas en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'FFF' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Laboratorio en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'GGG' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Archivos en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'HHH' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Facturación en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                        {tab === 'III' && (
                            <div>
                                <h1 className="mb-8 border-b border-gray-100 pb-4 text-3xl font-black uppercase tracking-widest text-gray-300">Consentimientos en construcción</h1>
                                {/* Código futuro aquí */}
                            </div>
                        )}
                    </div>
                </main>

                <aside className="hidden w-80 shrink-0 flex-col border-l border-gray-50 bg-white xl:flex">
                    <div className="relative flex h-24 shrink-0 items-center justify-end gap-5 border-b border-gray-50 bg-white px-8">
                        <button type="button" className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-[#F8F9FA] hover:text-primary" aria-label="Notificaciones">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-100"></div>

                        <div className="text-right">
                            <p className="text-[13px] font-black uppercase leading-none text-primary">{userName}</p>
                            <p className="mt-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-secondary">Paciente</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setProfileOpen((value) => !value)}
                            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-black text-white shadow-md transition-transform hover:scale-105"
                            aria-label="Abrir perfil"
                        >
                            {userName.substring(0, 1)}
                        </button>

                        {renderProfileMenu('right-8')}
                    </div>

                    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-8">
                        <h2 className="mb-8 px-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Novedades</h2>
                        <NewsCards />
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
                <h4 className="mb-2 text-sm font-black uppercase leading-snug text-primary transition-colors group-hover:text-secondary">Campaña de vacunación antigripal 2026.</h4>
                <p className="text-xs font-medium leading-relaxed text-gray-400">Conozca los horarios y disponibilidad en sede central.</p>
            </article>

            <article className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-secondary/30 hover:shadow-md">
                <h4 className="mb-2 text-sm font-black uppercase leading-snug text-primary transition-colors group-hover:text-secondary">Nuevos profesionales.</h4>
                <p className="text-xs font-medium leading-relaxed text-gray-400">Se incorpora equipo especializado en cardiología infantil.</p>
            </article>
        </div>
    );
}
