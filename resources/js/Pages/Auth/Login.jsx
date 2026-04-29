import { Head, Link, useForm } from '@inertiajs/react';

const fieldClass = 'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-primary placeholder:text-gray-400 transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '', password: '', remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans antialiased lg:p-8">
            <Head title="Ingreso | Hospital Universitario" />

            <div className="flex min-h-[600px] w-full max-w-[1000px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
                <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 md:flex md:w-2/5">
                    <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white opacity-5 blur-2xl"></div>
                    <div className="absolute -right-10 top-20 h-40 w-40 rounded-full bg-secondary opacity-20 blur-xl"></div>

                    <div className="relative z-10 mt-4">
                        <img src="/img/Logo HU Blanco.svg" alt="Hospital Universitario" className="mb-12 h-auto w-full opacity-95" />
                        <h2 className="mb-4 text-3xl font-black uppercase leading-tight tracking-tight text-white">
                            Bienvenido al <br /><span className="text-secondary">Portal.</span>
                        </h2>
                        <p className="pr-4 text-sm font-semibold leading-relaxed text-blue-100/75">
                            Gestione su salud de manera integral, fácil y segura.
                        </p>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="mb-3 h-1 w-8 rounded-full bg-secondary"></div>
                        <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Atención al Paciente</p>
                    </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center p-8 md:w-3/5 lg:p-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8 flex justify-center md:hidden">
                            <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-32" />
                        </div>

                        <div className="mb-10">
                            <h1 className="mb-2 text-3xl font-black tracking-tight text-primary">Iniciar sesión</h1>
                            <p className="text-sm font-semibold text-brandText">
                                ¿Personal médico? <Link href={route('medicos.login')} className="font-black text-secondary transition-all hover:underline">Ingresar aquí</Link>
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="mb-6 space-y-5">
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-[11px] font-black uppercase tracking-widest text-brandText">Correo electrónico</label>
                                    <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="paciente@hospital.com" required autoFocus autoComplete="email"
                                        className={fieldClass} />
                                    {errors.email && <p className="mt-2 text-xs font-semibold text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <label htmlFor="password" className="block text-[11px] font-black uppercase tracking-widest text-brandText">Contraseña</label>
                                        <Link href={route('password.request')} className="text-right text-[11px] font-black text-secondary hover:underline">¿Olvidaste tu clave?</Link>
                                    </div>
                                    <input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="••••••••" required autoComplete="current-password"
                                        className={`${fieldClass} font-black tracking-widest`} />
                                    {errors.password && <p className="mt-2 text-xs font-semibold text-red-600">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="mb-8 flex items-center">
                                <input type="checkbox" id="remember_me" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 flex-shrink-0 cursor-pointer rounded border-gray-300 text-primary transition-all focus:ring-primary" />
                                <label htmlFor="remember_me" className="ml-3 cursor-pointer select-none text-sm font-semibold text-brandText">
                                    Mantener sesión iniciada
                                </label>
                            </div>

                            {Object.keys(errors).some((field) => !['email', 'password'].includes(field)) && (
                                <div className="mb-6 rounded-xl border border-red-100 bg-red-50/50 p-4">
                                    <ul className="text-xs text-red-600 font-semibold space-y-1">
                                        {Object.entries(errors)
                                            .filter(([field]) => !['email', 'password'].includes(field))
                                            .map(([field, error]) => <li key={field}>• {error}</li>)}
                                    </ul>
                                </div>
                            )}

                            <button type="submit" disabled={processing} 
                                    className="w-full rounded-xl bg-primary py-4 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                                {processing ? 'Ingresando...' : 'Ingresar al Portal'}
                            </button>
                        </form>

                        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
                            <p className="text-sm font-semibold text-brandText">
                                ¿No tiene una cuenta? <Link href={route('register')} className="text-primary font-black hover:text-secondary transition-colors">Registrarse ahora</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
