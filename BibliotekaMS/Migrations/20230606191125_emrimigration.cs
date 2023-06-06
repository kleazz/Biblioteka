using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class emrimigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty1",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "MyProperty",
                table: "AspNetUsers",
                newName: "Emri");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Emri",
                table: "AspNetUsers",
                newName: "MyProperty");

            migrationBuilder.AddColumn<int>(
                name: "MyProperty1",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
