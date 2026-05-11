import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <div className="min-h-screen bg-[#F4F7F9] p-4 sm:p-6 lg:p-8 font-sans antialiased relative">
            <Head title="Mi Perfil | Hospital Universitario" />

            <div className="mx-auto max-w-4xl">
                {/* Cabecera de la página */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-primary">Configuración de Cuenta</h1>
                        <p className="font-semibold text-brandText mt-1">Gestione sus datos personales y preferencias de seguridad.</p>
                    </div>
                    <Link 
                        href={route('dashboard')} 
                        className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span> Volver al Portal
                    </Link>
                </div>

                {/* Contenedores de Formularios */}
                <div className="space-y-6">
                    <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-red-100 bg-red-50/30 p-6 sm:p-10 shadow-sm">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}