-- ============================================================================
-- Torneo de Cuarenta - 8 de diciembre de 2026
--
-- Esta migracion hace dos cosas:
--   1. Archiva los registros de la edicion anterior en una tabla aparte.
--   2. Agrega la columna `turno` a la tabla de inscripciones.
--
-- NO borra nada. El paso que elimina los registros viejos de la tabla activa
-- esta al final, comentado a proposito: corrilo solo despues de verificar que
-- la copia quedo completa.
--
-- Ejecutar por bloques, en orden, en el SQL Editor de Supabase.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- PASO 0. Cuantos registros hay hoy. Anota este numero: lo vas a comparar.
-- ----------------------------------------------------------------------------
select count(*) as registros_actuales
from public.cuarenta_registrations;


-- ----------------------------------------------------------------------------
-- PASO 1. Crear el archivo historico.
--
-- Se usa `create table as select *` para que la copia herede exactamente las
-- columnas que la tabla tenga hoy, sin que esta migracion tenga que
-- enumerarlas. Asi no hay riesgo de que falte una columna.
--
-- La copia no arrastra claves ni defaults, y eso es lo que queremos: es un
-- archivo de solo lectura, no una tabla de trabajo.
-- ----------------------------------------------------------------------------
create table if not exists public.cuarenta_historico as
select * from public.cuarenta_registrations;

-- Etiqueta de edicion, para distinguir si mas adelante se archiva otro año.
alter table public.cuarenta_historico
	add column if not exists edicion text;

update public.cuarenta_historico
set edicion = 'anterior'
where edicion is null;


-- ----------------------------------------------------------------------------
-- PASO 2. Proteger el archivo historico.
--
-- Importante: una tabla creada por SQL queda con RLS DESACTIVADO, y en el
-- schema `public` eso significa que la anon key de la app podria leerla y
-- escribirla. Aca se activa RLS y se deja solo lectura.
-- ----------------------------------------------------------------------------
alter table public.cuarenta_historico enable row level security;

drop policy if exists "historico lectura publica" on public.cuarenta_historico;
create policy "historico lectura publica"
	on public.cuarenta_historico
	for select
	using (true);

-- Sin politicas de insert/update/delete, nadie puede modificarlo con la
-- anon key. Solo la service role key, que no vive en el navegador.


-- ----------------------------------------------------------------------------
-- PASO 3. Verificar la copia ANTES de seguir.
--
-- Los dos numeros tienen que ser iguales. Si no lo son, detente aqui.
-- ----------------------------------------------------------------------------
select
	(select count(*) from public.cuarenta_registrations) as en_tabla_activa,
	(select count(*) from public.cuarenta_historico)     as en_historico;


-- ----------------------------------------------------------------------------
-- PASO 4. Agregar la columna `turno` a las inscripciones.
--
-- Queda nullable porque las filas que ya existen no tienen turno. Los valores
-- validos son los mismos ids que usa src/modules/cuarenta/config/tournament.ts
-- ----------------------------------------------------------------------------
alter table public.cuarenta_registrations
	add column if not exists turno text;

alter table public.cuarenta_registrations
	drop constraint if exists cuarenta_registrations_turno_check;

alter table public.cuarenta_registrations
	add constraint cuarenta_registrations_turno_check
	check (turno is null or turno in ('manana', 'tarde'));

-- Consultar por turno es la operacion mas frecuente del dashboard.
create index if not exists cuarenta_registrations_turno_idx
	on public.cuarenta_registrations (turno);


-- ============================================================================
-- PASO 5. OPCIONAL Y DESTRUCTIVO. Esta todo comentado.
--
-- Corre esto SOLO si el PASO 3 dio los dos numeros iguales y ya confirmaste
-- que el historico se ve bien. Deja la tabla activa unicamente con las
-- inscripciones del 8 de diciembre.
--
-- En Supabase no hay papelera: lo que se borra, se borra.
-- ============================================================================

-- delete from public.cuarenta_registrations
-- where turno is null;

-- Despues de limpiar, podes exigir el turno siempre:
-- alter table public.cuarenta_registrations
-- 	alter column turno set not null;
