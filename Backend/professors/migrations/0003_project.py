# Generated by Django 3.1 on 2020-08-31 09:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('promo', '0001_initial'),
        ('professors', '0002_auto_20200815_1519'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('domain', models.CharField(max_length=256)),
                ('tools', models.TextField()),
                ('required_documents', models.TextField()),
                ('document', models.FileField(upload_to='')),
                ('status', models.CharField(choices=[('A', 'Accepted'), ('P', 'Pending'), ('R', 'Rejected')], max_length=8)),
                ('professor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professors.professor')),
                ('promo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='promo.promo')),
            ],
        ),
    ]