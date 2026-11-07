<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelas_siswa', function (Blueprint $table) {
            $table->increments('kelas_siswa_id');
            $table->unsignedInteger('kelas_id');
            $table->unsignedInteger('siswa_id');
            $table->unsignedInteger('tahun_ajaran_id');

            $table->foreign('kelas_id')->references('kelas_id')->on('kelas');
            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('tahun_ajaran_id')->references('tahun_ajaran_id')->on('tahun_ajaran');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelas_siswa');
    }
};
