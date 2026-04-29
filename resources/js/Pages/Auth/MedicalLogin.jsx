import { Head, Link, useForm } from '@inertiajs/react';

const fieldClass = 'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-primary placeholder:text-gray-400 transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10';

export default function MedicalLogin() {
    const { data, setData, processing } = useForm({
        identifier: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans antialiased lg:p-8">
            <Head title="Ingreso médico | Hospital Universitario" />

            <div className="flex min-h-[600px] w-full max-w-[1000px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
                <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 md:flex md:w-2/5">
                    <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white opacity-5 blur-2xl"></div>
                    <div className="absolute -right-10 top-20 h-40 w-40 rounded-full bg-secondary opacity-20 blur-xl"></div>

                    <div className="relative z-10 mt-4">
                        <img src="/img/Logo HU Blanco.svg" alt="Hospital Universitario" className="mb-12 h-auto w-full opacity-95" />
                        <h2 className="mb-4 text-3xl font-black uppercase leading-tight tracking-tight text-white">
                            Acceso de <br /><span className="text-secondary">Personal Médico.</span>
                        </h2>
                        <p className="pr-4 text-sm font-semibold leading-relaxed text-blue-100/75">
                            Ingrese al espacio profesional para consultar agenda, pacientes y documentación clínica.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="mb-3 h-1 w-8 rounded-full bg-secondary"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/50">Área Profesional</p>
                    </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center p-8 md:w-3/5 lg:p-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8 flex justify-center md:hidden">
                            <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-32" />
                        </div>

                        <div className="mb-10">
                            <h1 className="mb-2 text-3xl font-black tracking-tight text-primary">Ingreso médico</h1>
                            <p className="text-sm font-semibold text-brandText">
                                ¿Sos paciente? <Link href={route('login')} className="font-black text-secondary transition-all hover:underline">Ingresar al portal de pacientes</Link>
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="mb-6 space-y-5">
                                <div>
                                    <label htmlFor="medical_identifier" className="mb-2 block text-[11px] font-black uppercase tracking-widest text-brandText">Matrícula o correo institucional</label>
                                    <input
                                        id="medical_identifier"
                                        type="text"
                                        value={data.identifier}
                                        onChange={(e) => setData('identifier', e.target.value)}
                                        placeholder="medico@hospital.com"
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        className={fieldClass}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <label htmlFor="medical_password" className="block text-[11px] font-black uppercase tracking-widest text-brandText">Contraseña</label>
                                        <Link href={route('password.request')} className="text-right text-[11px] font-black text-secondary hover:underline">¿Olvidaste tu clave?</Link>
                                    </div>
                                    <input
                                        id="medical_password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                        className={`${fieldClass} font-black tracking-widest`}
                                    />
                                </div>
                            </div>

                            <div className="mb-8 flex items-center">
                                <input
                                    type="checkbox"
                                    id="medical_remember_me"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 flex-shrink-0 cursor-pointer rounded border-gray-300 text-primary transition-all focus:ring-primary"
                                />
                                <label htmlFor="medical_remember_me" className="ml-3 cursor-pointer select-none text-sm font-semibold text-brandText">
                                    Mantener sesión iniciada
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-primary py-4 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Ingresar al panel médico
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
