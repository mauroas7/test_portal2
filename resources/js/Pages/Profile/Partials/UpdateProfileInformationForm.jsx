import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-8 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary">
                        <span className="material-symbols-outlined">badge</span>
                    </div>
                    <h2 className="text-lg font-black uppercase tracking-tight text-primary">
                        Información del Paciente
                    </h2>
                </div>
                <p className="text-sm font-medium text-brandText mt-2">
                    Actualice su información de contacto. Por seguridad clínica, algunos campos no pueden ser modificados desde el portal.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-8">
                
                {/* --- BLOQUE 1: DATOS CLÍNICOS (BLOQUEADOS) --- */}
                <div className="rounded-2xl border border-gray-100 bg-[#F8F9FA] p-6">
                    <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">lock</span> Identidad Registrada
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">Nombre Completo</label>
                            <input 
                                type="text" 
                                value={user.name} 
                                disabled 
                                className="w-full rounded-xl border border-gray-200 bg-gray-100 py-3 px-4 text-sm font-bold text-gray-500 cursor-not-allowed opacity-70" 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 block ml-1">DNI / Documento</label>
                            <input 
                                type="text" 
                                value={user.dni || '20.123.456'} // Reemplazar con user.dni si lo tenés
                                disabled 
                                className="w-full rounded-xl border border-gray-200 bg-gray-100 py-3 px-4 text-sm font-bold text-gray-500 cursor-not-allowed opacity-70" 
                            />
                        </div>
                    </div>
                    <p className="mt-3 text-[10px] font-bold text-red-400 uppercase tracking-wide">
                        * Para modificar datos legales, por favor acérquese a la recepción de sede central con su documento original.
                    </p>
                </div>

                {/* --- BLOQUE 2: DATOS DE CONTACTO (EDITABLES) --- */}
                <div>
                    <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">edit</span> Datos de Contacto
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 block ml-1">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                className="w-full rounded-xl border border-gray-200 bg-[#F4F7F9] py-3 px-4 text-sm font-bold text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                            />
                            {errors.email && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 block ml-1">Teléfono Celular</label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Ej: 261 555 5555"
                                className="w-full rounded-xl border border-gray-200 bg-[#F4F7F9] py-3 px-4 text-sm font-bold text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                            />
                            {errors.phone && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.phone}</p>}
                        </div>
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                        <p className="text-sm font-medium text-amber-800">
                            Tu dirección de correo electrónico no está verificada.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-bold underline hover:text-amber-900"
                            >
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-green-600">
                                Se ha enviado un nuevo enlace de verificación a tu correo.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button 
                        disabled={processing} 
                        className={`flex items-center gap-2 rounded-full px-8 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-all shadow-lg ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:-translate-y-0.5 hover:bg-[#00284A] shadow-primary/30'}`}
                    >
                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="opacity-0 -translate-x-4"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 translate-x-4"
                    >
                        <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-500">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span> Guardado.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}