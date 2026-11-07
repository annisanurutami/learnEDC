<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presensi_guru', function (Blueprint $table) {
            $table->increments('presensi_guru_id');
            $table->unsignedInteger('guru_id');
            $table->unsignedInteger('jadwal_id');
            $table->date('tanggal');
            $table->time('jam_masuk')->nullable();
            $table->enum('status', ['H', 'S', 'I', 'A']);
            $table->string('keterangan', 255)->nullable();

            $table->foreign('guru_id')->references('guru_id')->on('guru');
            $table->foreign('jadwal_id')->references('jadwal_id')->on('jadwal_pelajaran');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presensi_guru');
    }
};
