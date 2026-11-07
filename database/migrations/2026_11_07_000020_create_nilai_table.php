<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nilai', function (Blueprint $table) {
            $table->increments('nilai_id');
            $table->unsignedInteger('siswa_id');
            $table->unsignedInteger('guru_mapel_id');
            $table->unsignedInteger('semester_id');
            $table->enum('jenis', ['tugas_harian', 'UH', 'UTS', 'UAS']);
            $table->decimal('nilai', 5, 2);
            $table->unsignedInteger('sumber_id')->nullable()->comment('ID tugas/ujian asal (opsional)');
            $table->timestamp('created_at')->nullable()->useCurrent();

            $table->foreign('siswa_id')->references('siswa_id')->on('siswa');
            $table->foreign('guru_mapel_id')->references('guru_mapel_id')->on('guru_mapel');
            $table->foreign('semester_id')->references('semester_id')->on('semester');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nilai');
    }
};
