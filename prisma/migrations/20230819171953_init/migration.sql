-- CreateTable
CREATE TABLE "accounts"
(
    "id"                  TEXT         NOT NULL,
    "user_id"             TEXT         NOT NULL,
    "type"                TEXT         NOT NULL,
    "provider"            TEXT         NOT NULL,
    "provider_account_id" TEXT         NOT NULL,
    "refresh_token"       TEXT,
    "access_token"        TEXT,
    "expires_at"          INTEGER,
    "token_type"          TEXT,
    "scope"               TEXT,
    "id_token"            TEXT,
    "session_state"       TEXT,
    "created_at"          TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"          TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions"
(
    "id"            TEXT         NOT NULL,
    "session_token" TEXT         NOT NULL,
    "user_id"       TEXT         NOT NULL,
    "expires"       TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"
(
    "id"             TEXT         NOT NULL,
    "name"           TEXT,
    "email"          TEXT,
    "email_verified" TIMESTAMP(3),
    "image"          TEXT,
    "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens"
(
    "identifier" TEXT         NOT NULL,
    "token"      TEXT         NOT NULL,
    "expires"    TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "activities"
(
    "id"          TEXT         NOT NULL,
    "user_id"     TEXT         NOT NULL,
    "name"        TEXT         NOT NULL,
    "description" TEXT,
    "color_code"  TEXT         NOT NULL,
    "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_log"
(
    "id"          TEXT         NOT NULL,
    "activity_id" TEXT         NOT NULL,
    "date"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count"       INTEGER      NOT NULL DEFAULT 1,

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts" ("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions" ("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens" ("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens" ("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts"
    ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions"
    ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities"
    ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_log"
    ADD CONSTRAINT "activity_log_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;