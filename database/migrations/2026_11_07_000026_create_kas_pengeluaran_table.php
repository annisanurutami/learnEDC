<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kas_pengeluaran', function (Blueprint $table) {
            $table->increments('kas_pengeluaran_id');
            $table->unsignedInteger('kelas_id');
            $table->date('tanggal');
            $table->decimal('jumlah', 12, 2);
            $table->string('keterangan', 255)->nullable();
            $table->string('bukti_path', 255)->nullable();
            $table->unsignedInteger('dicatat_oleh_user_id')->nullable();

            $table->foreign('kelas_id')->references('kelas_id')->on('kelas');
            $table->foreign('dicatat_oleh_user_id')->references('user_id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kas_pengeluaran');
    }
};
