using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class lch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Sasia",
                table: "Libri",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sasia",
                table: "Libri");
        }
    }
}
