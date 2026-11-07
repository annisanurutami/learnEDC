<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dokumentasi_piket', function (Blueprint $table) {
            $table->increments('dokumentasi_piket_id');
            $table->unsignedInteger('jadwal_piket_id');
            $table->date('tanggal');
            $table->string('foto_path', 255)->nullable();
            $table->string('keterangan', 255)->nullable();

            $table->foreign('jadwal_piket_id')->references('jadwal_piket_id')->on('jadwal_piket');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dokumentasi_piket');
    }
};
