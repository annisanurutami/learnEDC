<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catatan_karakter', function (Blueprint $table) {
            $table->increments('catatan_karakter_id');
            $table->unsignedInteger('siswa_id');
            $table->unsignedInteger('wali_kelas_guru_id');
            $table->unsignedInteger('semester_id');
            $table->string('aspek', 100);
            $table->text('deskripsi')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();

            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('wali_kelas_guru_id')->references('guru_id')->on('guru');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catatan_karakter');
    }
};
