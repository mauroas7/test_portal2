import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-8 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary">
                        <span className="material-symbols-outlined">password</span>
                    </div>
                    <h2 className="text-lg font-black uppercase tracking-tight text-primary">
                        Actualizar Contraseña
                    </h2>
                </div>
                <p className="text-sm font-medium text-brandText mt-2">
                    Asegúrese de que su cuenta utilice una contraseña segura.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label htmlFor="current_password" className="text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 block ml-1">Contraseña Actual</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="w-full rounded-xl border border-gray-200 bg-[#F4F7F9] py-3 px-4 text-sm font-bold text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                        autoComplete="current-password"
                    />
                    {errors.current_password && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.current_password}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 block ml-1">Nueva Contraseña</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full rounded-xl border border-gray-200 bg-[#F4F7F9] py-3 px-4 text-sm font-bold text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 block ml-1">Confirmar Contraseña</label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="w-full rounded-xl border border-gray-200 bg-[#F4F7F9] py-3 px-4 text-sm font-bold text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button 
                        disabled={processing} 
                        className={`flex items-center gap-2 rounded-full px-8 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-all shadow-lg ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:-translate-y-0.5 hover:bg-[#00284A] shadow-primary/30'}`}
                    >
                        {processing ? 'Guardando...' : 'Guardar Contraseña'}
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
                            <span className="material-symbols-outlined text-[18px]">check_circle</span> Actualizada.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}