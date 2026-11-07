<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kas_pembayaran', function (Blueprint $table) {
            $table->increments('kas_pembayaran_id');
            $table->unsignedInteger('kelas_id');
            $table->unsignedInteger('siswa_id');
            $table->date('tanggal');
            $table->string('periode', 30)->nullable();
            $table->decimal('jumlah', 12, 2);
            $table->enum('status', ['lunas', 'belum'])->default('lunas');
            $table->unsignedInteger('dicatat_oleh_user_id')->nullable();

            $table->foreign('kelas_id')->references('kelas_id')->on('kelas');
            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('dicatat_oleh_user_id')->references('user_id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kas_pembayaran');
    }
};
