import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

const fieldBaseClass = 'w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold placeholder:text-gray-400 transition-all focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10';
const inputClass = `${fieldBaseClass} text-primary`;
const labelClass = 'mb-1.5 block text-[10px] font-black uppercase tracking-widest text-brandText';
const errorClass = 'mt-1 text-xs font-semibold text-red-600';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', last_name: '', dni: '', phone: '',
        genero: '', obra_social: '', plan: '',
        email: '', password: '', password_confirmation: '',
    });

    useEffect(() => { return () => { reset('password', 'password_confirmation'); }; }, []);

    const submit = (e) => { e.preventDefault(); post('/register'); };

    const handleTextOnly = (field, value) => { setData(field, value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')); };
    const handleNumericOnly = (field, value) => { setData(field, value.replace(/[^0-9]/g, '')); };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] p-3 font-sans antialiased lg:p-5">
            <Head title="Registro" />

            <div className="flex w-full max-w-[1120px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl lg:flex-row">
                <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 lg:flex lg:w-[32%]">
                    <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white opacity-5 blur-2xl"></div>
                    <div className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-secondary opacity-10 blur-2xl"></div>

                    <div className="relative z-10 mt-4">
                        <img src="/img/Logo HU Blanco.svg" alt="Hospital Universitario" className="mb-8 h-auto w-full opacity-95" />
                        <h2 className="mb-3 text-2xl font-black uppercase leading-tight tracking-tight text-white">
                            Comience su <br /><span className="text-secondary">atención aquí.</span>
                        </h2>
                        <p className="pr-4 text-sm font-semibold leading-relaxed text-blue-100/75">
                            Cree su cuenta para acceder a la cartilla médica, solicitar turnos y gestionar su historial.
                        </p>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="mb-3 h-1 w-8 rounded-full bg-secondary"></div>
                        <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Registro de pacientes</p>
                    </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center p-6 lg:w-[68%] lg:p-8">
                    <div className="w-full max-w-2xl">
                        <div className="mb-5 flex justify-center lg:hidden">
                            <img src="/img/Logo HU Uso Diario.svg" alt="Hospital Universitario" className="h-auto w-32" />
                        </div>

                        <div className="mb-5">
                            <h1 className="mb-1 text-3xl font-black tracking-tight text-primary">Crear cuenta</h1>
                            <p className="text-sm font-semibold text-brandText">Complete sus datos personales para darse de alta en el sistema.</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-x-5 gap-y-3.5 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className={labelClass}>Nombre/s</label>
                                    <input id="name" type="text" value={data.name} onChange={(e) => handleTextOnly('name', e.target.value)} placeholder="Ej. Juan" required autoComplete="given-name"
                                        className={inputClass} />
                                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className={labelClass}>Apellido/s</label>
                                    <input id="last_name" type="text" value={data.last_name} onChange={(e) => handleTextOnly('last_name', e.target.value)} placeholder="Ej. Pérez" required autoComplete="family-name"
                                        className={inputClass} />
                                    {errors.last_name && <p className={errorClass}>{errors.last_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="dni" className={labelClass}>Número de Documento (DNI)</label>
                                    <input id="dni" type="text" inputMode="numeric" value={data.dni} onChange={(e) => handleNumericOnly('dni', e.target.value)} placeholder="Sin puntos" required autoComplete="off"
                                        className={inputClass} />
                                    {errors.dni && <p className={errorClass}>{errors.dni}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className={labelClass}>Celular</label>
                                    <input id="phone" type="text" inputMode="numeric" value={data.phone} onChange={(e) => handleNumericOnly('phone', e.target.value)} placeholder="2615555555" required autoComplete="tel"
                                        className={inputClass} />
                                    {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                                </div>

                                <div>
                                    <label htmlFor="genero" className={labelClass}>Género</label>
                                    <select id="genero" value={data.genero} onChange={(e) => setData('genero', e.target.value)} required 
                                        className={`${fieldBaseClass} cursor-pointer ${data.genero === '' ? 'text-gray-400' : 'text-primary'}`}>
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    {errors.genero && <p className={errorClass}>{errors.genero}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>Correo electrónico</label>
                                    <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="mail@ejemplo.com" required autoComplete="email"
                                        className={inputClass} />
                                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="obra_social" className={labelClass}>Obra social</label>
                                    <select id="obra_social" value={data.obra_social} onChange={(e) => setData('obra_social', e.target.value)} required 
                                        className={`${fieldBaseClass} cursor-pointer ${data.obra_social === '' ? 'text-gray-400' : 'text-primary'}`}>
                                        <option value="" disabled>Cobertura...</option>
                                        <option value="Particular">Particular</option>
                                        <option value="OSEP">OSEP</option>
                                        <option value="OSDE">OSDE</option>
                                        <option value="Swiss Medical">Swiss Medical</option>
                                        <option value="Galeno">Galeno</option>
                                        <option value="DAMSU">DAMSU</option>
                                    </select>
                                    {errors.obra_social && <p className={errorClass}>{errors.obra_social}</p>}
                                </div>

                                <div>
                                    <label htmlFor="plan" className={labelClass}>Plan (opcional)</label>
                                    <select id="plan" value={data.plan} onChange={(e) => setData('plan', e.target.value)} 
                                        className={`${fieldBaseClass} cursor-pointer ${data.plan === '' ? 'text-gray-400' : 'text-primary'}`}>
                                        <option value="">No aplica</option>
                                        <option value="Básico">Básico</option>
                                        <option value="210">210 / Plata</option>
                                        <option value="310">310 / Oro</option>
                                        <option value="PMO">PMO</option>
                                    </select>
                                    {errors.plan && <p className={errorClass}>{errors.plan}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className={labelClass}>Contraseña</label>
                                    <input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required placeholder="••••••••" autoComplete="new-password"
                                        className={`${inputClass} font-black tracking-widest placeholder:tracking-normal`} />
                                    {errors.password && <p className={errorClass}>{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className={labelClass}>Confirmar contraseña</label>
                                    <input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required placeholder="••••••••" autoComplete="new-password"
                                        className={`${inputClass} font-black tracking-widest placeholder:tracking-normal`} />
                                    {errors.password_confirmation && <p className={errorClass}>{errors.password_confirmation}</p>}
                                </div>
                            </div>

                            <button type="submit" disabled={processing} 
                                    className="mt-5 w-full rounded-xl bg-primary py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                                {processing ? 'Creando cuenta...' : 'Crear mi cuenta'}
                            </button>
                        </form>

                        <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                            <p className="text-sm font-semibold text-brandText">
                                ¿Ya tiene una cuenta? <Link href={route('login')} className="text-primary font-black hover:text-secondary transition-colors">Iniciar sesión</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
