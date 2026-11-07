<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presensi_siswa', function (Blueprint $table) {
            $table->increments('presensi_siswa_id');
            $table->unsignedInteger('siswa_id');
            $table->unsignedInteger('jadwal_id');
            $table->date('tanggal');
            $table->enum('status', ['H', 'S', 'I', 'A']);
            $table->string('keterangan', 255)->nullable();
            $table->unsignedInteger('dicatat_oleh_user_id')->nullable();

            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('jadwal_id')->references('jadwal_id')->on('jadwal_pelajaran');
            $table->foreign('dicatat_oleh_user_id')->references('user_id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presensi_siswa');
    }
};
