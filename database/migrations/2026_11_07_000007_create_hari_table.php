<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hari', function (Blueprint $table) {
            $table->tinyIncrements('hari_id');
            $table->string('nama_hari', 10)->unique();
            $table->unsignedTinyInteger('urutan');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hari');
    }
};
