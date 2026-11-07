<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jadwal_pelajaran', function (Blueprint $table) {
            $table->increments('jadwal_id');
            $table->unsignedInteger('guru_mapel_id');
            $table->unsignedInteger('semester_id');
            $table->unsignedTinyInteger('hari_id');
            $table->time('jam_mulai');
            $table->time('jam_selesai');

            $table->foreign('guru_mapel_id')->references('guru_mapel_id')->on('guru_mapel');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
            $table->foreign('hari_id')->references('hari_id')->on('hari');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jadwal_pelajaran');
    }
};
