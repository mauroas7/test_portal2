import { useState } from 'react';

export default function SeccionSalud() {
    const [subTabSalud, setSubTabSalud] = useState('resultados');

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="mb-2 text-3xl font-black tracking-tight text-primary lg:text-4xl uppercase">Mi Salud</h1>
                    <p className="font-semibold text-brandText">Su historial clínico, resultados de estudios y recetas médicas.</p>
                </div>
            </div>

            <div className="mb-8 flex p-1.5 bg-white shadow-sm w-fit rounded-xl border border-gray-100 overflow-x-auto max-w-full">
                <button onClick={() => setSubTabSalud('resultados')} className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabSalud === 'resultados' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}>
                    Resultados y Estudios
                </button>
                <button onClick={() => setSubTabSalud('recetas')} className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabSalud === 'recetas' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}>
                    Mis Recetas
                </button>
                <button onClick={() => setSubTabSalud('perfil')} className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${subTabSalud === 'perfil' ? 'bg-[#F4F7F9] text-primary shadow-inner border border-gray-100' : 'text-gray-400 hover:text-brandText'}`}>
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
                        <div className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F4F7F9] lg:grid-cols-5 lg:items-center lg:px-10">
                            <div className="lg:col-span-2 flex items-center gap-4 min-w-0">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-primary">
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
                                <span className="rounded-full bg-green-50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-green-700 border border-green-100">Disponible</span>
                            </div>
                            <div className="flex justify-start lg:justify-center mt-2 lg:mt-0">
                                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary transition-colors hover:border-secondary/30 hover:bg-[#F4F7F9]">
                                    <span className="material-symbols-outlined text-[16px] text-secondary">picture_as_pdf</span> PDF
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 border-b border-gray-50 px-6 py-6 transition-colors hover:bg-[#F4F7F9] lg:grid-cols-5 lg:items-center lg:px-10 opacity-70">
                            <div className="lg:col-span-2 flex items-center gap-4 min-w-0">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4F7F9] shadow-inner text-amber-600">
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
                                <span className="rounded-full bg-amber-50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-700 border border-amber-100">Analizando</span>
                            </div>
                            <div className="flex justify-start lg:justify-center mt-2 lg:mt-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Demora: 48hs</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {subTabSalud === 'recetas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                    <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-[shadow,border-color] hover:border-secondary/30 hover:shadow-md">
                        <div className="mb-6 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4F7F9] shadow-inner text-primary">
                                    <span className="material-symbols-outlined text-[28px]">prescriptions</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-primary">Losartán 50mg</h3>
                                    <span className="rounded bg-green-50 border border-green-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-green-700">Tratamiento Crónico</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8 space-y-3 rounded-xl bg-[#F4F7F9] border border-gray-100 p-5">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-xs font-semibold text-gray-500">Indicación</span>
                                <span className="text-xs font-black text-primary uppercase">1 comp cada 12hs</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-xs font-semibold text-gray-500">Profesional</span>
                                <span className="text-xs font-black text-primary uppercase">Dr. Favaloro</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs font-semibold text-gray-500">Vencimiento</span>
                                <span className="text-xs font-black text-red-500 uppercase">En 5 días</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary shadow-sm px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-blue-900">
                                <span className="material-symbols-outlined text-[16px]">qr_code_2</span> Ver QR
                            </button>
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary transition-colors hover:bg-[#F4F7F9]">
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
    );
}