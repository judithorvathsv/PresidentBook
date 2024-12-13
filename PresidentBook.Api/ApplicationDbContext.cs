using Microsoft.EntityFrameworkCore;
using PresidentBook.Api.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
    {
    }

    public DbSet<President> Presidents { get; set; }
}