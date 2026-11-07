<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ujian', function (Blueprint $table) {
            $table->increments('ujian_id');
            $table->unsignedInteger('guru_mapel_id');
            $table->unsignedInteger('semester_id');
            $table->string('judul', 200);
            $table->enum('jenis', ['UH', 'UTS', 'UAS']);
            $table->unsignedInteger('durasi_menit');
            $table->dateTime('waktu_mulai');
            $table->dateTime('waktu_selesai');

            $table->foreign('guru_mapel_id')->references('guru_mapel_id')->on('guru_mapel');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ujian');
    }
};
