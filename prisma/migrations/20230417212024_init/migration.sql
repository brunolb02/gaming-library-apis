-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "username" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completed_games" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR NOT NULL,
    "image_url" VARCHAR NOT NULL DEFAULT 'default.png',
    "release_date" TIMESTAMPTZ(3) NOT NULL,
    "completed_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metacritic_score" VARCHAR(10) NOT NULL DEFAULT 'n/a',
    "user_score" VARCHAR(10) NOT NULL,
    "total_time_to_beat" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL,
    "review" VARCHAR NOT NULL,

    CONSTRAINT "completed_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playing_games" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR NOT NULL,
    "image_url" VARCHAR NOT NULL DEFAULT 'default.png',
    "release_date" TIMESTAMPTZ(3) NOT NULL,
    "metacritic_score" VARCHAR(10) NOT NULL DEFAULT 'n/a',
    "time_to_beat" JSONB NOT NULL,
    "start_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "playing_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_games" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR NOT NULL,
    "image_url" VARCHAR NOT NULL DEFAULT 'default.png',
    "release_date" TIMESTAMPTZ(3) NOT NULL,
    "metacritic_score" VARCHAR(10) NOT NULL DEFAULT 'n/a',
    "time_to_beat" JSONB NOT NULL,

    CONSTRAINT "pending_games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "completed_games" ADD CONSTRAINT "completed_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playing_games" ADD CONSTRAINT "playing_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pending_games" ADD CONSTRAINT "pending_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
