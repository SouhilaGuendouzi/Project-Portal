# Generated by Django 3.1 on 2020-08-15 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('professors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='grade',
            field=models.CharField(blank=True, choices=[('MCA', 'MCA'), ('MCB', 'MCB'), ('MAA', 'MAA'), ('MAB', 'MAB'), ('Pr', 'Pr')], default=None, max_length=50),
        ),
    ]
