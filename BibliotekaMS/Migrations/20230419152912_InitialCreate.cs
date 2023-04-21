using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kategoria",
                columns: table => new
                {
                    KategoriaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriKategorise = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoria", x => x.KategoriaId);
                });

            migrationBuilder.CreateTable(
                name: "Libri",
                columns: table => new
                {
                    Isbn = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fotoja = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libri", x => x.Isbn);
                });

            migrationBuilder.CreateTable(
                name: "KategoriaELibrit",
                columns: table => new
                {
                    Isbn = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KategoriaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KategoriaELibrit", x => new { x.Isbn, x.KategoriaId });
                    table.ForeignKey(
                        name: "FK_KategoriaELibrit_Kategoria_KategoriaId",
                        column: x => x.KategoriaId,
                        principalTable: "Kategoria",
                        principalColumn: "KategoriaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KategoriaELibrit_Libri_Isbn",
                        column: x => x.Isbn,
                        principalTable: "Libri",
                        principalColumn: "Isbn",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KategoriaELibrit_KategoriaId",
                table: "KategoriaELibrit",
                column: "KategoriaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KategoriaELibrit");

            migrationBuilder.DropTable(
                name: "Kategoria");

            migrationBuilder.DropTable(
                name: "Libri");
        }
    }
}
