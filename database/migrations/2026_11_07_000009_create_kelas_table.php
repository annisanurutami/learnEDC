<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->increments('kelas_id');
            $table->string('nama_kelas', 30);
            $table->string('tingkat', 10)->nullable();
            $table->unsignedInteger('tahun_ajaran_id');
            $table->unsignedInteger('wali_kelas_guru_id')->nullable();

            $table->foreign('tahun_ajaran_id')->references('tahun_ajaran_id')->on('tahun_ajaran');
            $table->foreign('wali_kelas_guru_id')->references('guru_id')->on('guru');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};
