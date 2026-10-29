import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'reception');
  CREATE TYPE "public"."enum_posts_visual" AS ENUM('pemf', 'robot', 'camp');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_visual" AS ENUM('pemf', 'robot', 'camp');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_durations" AS ENUM('30', '60');
  CREATE TYPE "public"."enum_services_locations" AS ENUM('zadar', 'biograd');
  CREATE TYPE "public"."enum_locations_opening_days" AS ENUM('0', '1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_locations_code" AS ENUM('zadar', 'biograd');
  CREATE TYPE "public"."enum_reservations_kind" AS ENUM('appointment', 'blocked');
  CREATE TYPE "public"."enum_reservations_location" AS ENUM('zadar', 'biograd');
  CREATE TYPE "public"."enum_reservations_starttime_tz" AS ENUM('Europe/Zagreb');
  CREATE TYPE "public"."enum_reservations_duration" AS ENUM('30', '60');
  CREATE TYPE "public"."enum_reservations_endtime_tz" AS ENUM('Europe/Zagreb');
  CREATE TYPE "public"."enum_reservations_status" AS ENUM('confirmed', 'completed', 'no-show', 'cancelled');
  CREATE TYPE "public"."enum_reservations_source" AS ENUM('admin', 'website');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'answered');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "posts_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "posts_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"category" varchar,
  	"read_time" varchar DEFAULT '4 min čitanja',
  	"author_name" varchar DEFAULT 'Prehab',
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"cover_image_id" integer,
  	"visual" "enum_posts_visual" DEFAULT 'camp',
  	"background_color" varchar DEFAULT '#121a29',
  	"event_location" varchar,
  	"event_date_label" varchar,
  	"event_duration" varchar,
  	"event_contact" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_category" varchar,
  	"version_read_time" varchar DEFAULT '4 min čitanja',
  	"version_author_name" varchar DEFAULT 'Prehab',
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_cover_image_id" integer,
  	"version_visual" "enum__posts_v_version_visual" DEFAULT 'camp',
  	"version_background_color" varchar DEFAULT '#121a29',
  	"version_event_location" varchar,
  	"version_event_date_label" varchar,
  	"version_event_duration" varchar,
  	"version_event_contact" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "services_durations" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_services_durations",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_locations" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_services_locations",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"legacy_id" numeric,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_opening_days" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_locations_opening_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"code" "enum_locations_code" NOT NULL,
  	"address" varchar NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reservations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar,
  	"kind" "enum_reservations_kind" DEFAULT 'appointment' NOT NULL,
  	"location" "enum_reservations_location" NOT NULL,
  	"service_id" integer,
  	"start_time" timestamp(3) with time zone NOT NULL,
  	"starttime_tz" "enum_reservations_starttime_tz" DEFAULT 'Europe/Zagreb' NOT NULL,
  	"duration" "enum_reservations_duration" DEFAULT '30',
  	"end_time" timestamp(3) with time zone NOT NULL,
  	"endtime_tz" "enum_reservations_endtime_tz" DEFAULT 'Europe/Zagreb' NOT NULL,
  	"status" "enum_reservations_status" DEFAULT 'confirmed' NOT NULL,
  	"full_name" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"source" "enum_reservations_source" DEFAULT 'admin',
  	"privacy_version" varchar,
  	"privacy_acknowledged_at" timestamp(3) with time zone,
  	"request_key" varchar,
  	"request_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"location" varchar,
  	"message" varchar NOT NULL,
  	"status" "enum_inquiries_status" DEFAULT 'new',
  	"privacy_version" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"locations_id" integer,
  	"reservations_id" integer,
  	"inquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clinic_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booking_enabled" boolean DEFAULT false,
  	"lead_minutes" numeric DEFAULT 120 NOT NULL,
  	"horizon_days" numeric DEFAULT 90 NOT NULL,
  	"retention_days" numeric DEFAULT 180 NOT NULL,
  	"legal_name" varchar,
  	"registered_address" varchar,
  	"oib" varchar,
  	"registry" varchar,
  	"professional_details" varchar,
  	"vat_information" varchar,
  	"phone" varchar DEFAULT '+385 95 906 4240' NOT NULL,
  	"email" varchar DEFAULT 'nikola.lukic.993@gmail.com' NOT NULL,
  	"privacy_email" varchar,
  	"dpo_contact" varchar,
  	"processors" varchar,
  	"transfers" varchar,
  	"health_legal_basis" varchar,
  	"privacy_extra" varchar,
  	"privacy_version" varchar DEFAULT '2026-10-28' NOT NULL,
  	"privacy_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_sections" ADD CONSTRAINT "posts_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_sources" ADD CONSTRAINT "posts_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sections" ADD CONSTRAINT "_posts_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sources" ADD CONSTRAINT "_posts_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_durations" ADD CONSTRAINT "services_durations_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locations" ADD CONSTRAINT "services_locations_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_opening_days" ADD CONSTRAINT "locations_opening_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservations" ADD CONSTRAINT "reservations_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reservations_fk" FOREIGN KEY ("reservations_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "posts_sections_order_idx" ON "posts_sections" USING btree ("_order");
  CREATE INDEX "posts_sections_parent_id_idx" ON "posts_sections" USING btree ("_parent_id");
  CREATE INDEX "posts_sources_order_idx" ON "posts_sources" USING btree ("_order");
  CREATE INDEX "posts_sources_parent_id_idx" ON "posts_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_version_sections_order_idx" ON "_posts_v_version_sections" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sections_parent_id_idx" ON "_posts_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_sources_order_idx" ON "_posts_v_version_sources" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sources_parent_id_idx" ON "_posts_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "services_durations_order_idx" ON "services_durations" USING btree ("order");
  CREATE INDEX "services_durations_parent_idx" ON "services_durations" USING btree ("parent_id");
  CREATE INDEX "services_locations_order_idx" ON "services_locations" USING btree ("order");
  CREATE INDEX "services_locations_parent_idx" ON "services_locations" USING btree ("parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "locations_opening_days_order_idx" ON "locations_opening_days" USING btree ("order");
  CREATE INDEX "locations_opening_days_parent_idx" ON "locations_opening_days" USING btree ("parent_id");
  CREATE UNIQUE INDEX "locations_code_idx" ON "locations" USING btree ("code");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "reservations_reference_idx" ON "reservations" USING btree ("reference");
  CREATE INDEX "reservations_location_idx" ON "reservations" USING btree ("location");
  CREATE INDEX "reservations_service_idx" ON "reservations" USING btree ("service_id");
  CREATE INDEX "reservations_start_time_idx" ON "reservations" USING btree ("start_time");
  CREATE UNIQUE INDEX "reservations_request_key_idx" ON "reservations" USING btree ("request_key");
  CREATE INDEX "reservations_updated_at_idx" ON "reservations" USING btree ("updated_at");
  CREATE INDEX "reservations_created_at_idx" ON "reservations" USING btree ("created_at");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_reservations_id_idx" ON "payload_locked_documents_rels" USING btree ("reservations_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)

  // Real PostgreSQL enforces this across transactions, workers and API/admin writes.
  await db.execute(`
    CREATE EXTENSION IF NOT EXISTS btree_gist;
    ALTER TABLE "reservations" ADD CONSTRAINT "reservations_positive_interval"
      CHECK (end_time IS NOT NULL AND end_time > start_time);
    ALTER TABLE "reservations" ADD CONSTRAINT "reservations_valid_appointment"
      CHECK (kind = 'blocked' OR (
        duration IS NOT NULL AND service_id IS NOT NULL AND full_name IS NOT NULL AND phone IS NOT NULL
        AND end_time = start_time + CASE WHEN duration = '30' THEN interval '30 minutes' ELSE interval '60 minutes' END
        AND (start_time AT TIME ZONE 'Europe/Zagreb')::time >= time '08:00'
        AND (end_time AT TIME ZONE 'Europe/Zagreb')::time <= time '19:00'
        AND (start_time AT TIME ZONE 'Europe/Zagreb')::date = (end_time AT TIME ZONE 'Europe/Zagreb')::date
        AND EXTRACT(MINUTE FROM start_time AT TIME ZONE 'Europe/Zagreb') IN (0, 30)
        AND EXTRACT(SECOND FROM start_time) = 0
      ));
    ALTER TABLE "reservations" ADD CONSTRAINT "reservations_no_overlap"
      EXCLUDE USING gist (location WITH =, tstzrange(start_time, end_time, '[)') WITH &&)
      WHERE (status <> 'cancelled');
    CREATE TABLE "request_limits" (
      "key" text PRIMARY KEY, "hits" integer NOT NULL, "expires_at" timestamptz NOT NULL
    );
    CREATE INDEX "request_limits_expiry" ON "request_limits" (expires_at);
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`DROP TABLE IF EXISTS "request_limits";`);
  await db.execute(`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "posts_sections" CASCADE;
  DROP TABLE "posts_sources" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v_version_sections" CASCADE;
  DROP TABLE "_posts_v_version_sources" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_durations" CASCADE;
  DROP TABLE "services_locations" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "locations_opening_days" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "reservations" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "clinic_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_posts_visual";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_visual";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_services_durations";
  DROP TYPE "public"."enum_services_locations";
  DROP TYPE "public"."enum_locations_opening_days";
  DROP TYPE "public"."enum_locations_code";
  DROP TYPE "public"."enum_reservations_kind";
  DROP TYPE "public"."enum_reservations_location";
  DROP TYPE "public"."enum_reservations_starttime_tz";
  DROP TYPE "public"."enum_reservations_duration";
  DROP TYPE "public"."enum_reservations_endtime_tz";
  DROP TYPE "public"."enum_reservations_status";
  DROP TYPE "public"."enum_reservations_source";
  DROP TYPE "public"."enum_inquiries_status";`)
}
