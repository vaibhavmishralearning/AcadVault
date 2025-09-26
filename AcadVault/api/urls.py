
from django.urls import path, include
from app import views
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
# from django.contrib.staticfiles.urls import staticfiles_urlpatterns

router = DefaultRouter()
router.register(r'students', views.StudentViewSet, basename='student')
router.register(r'department', views.DepartmentsViewSet, basename='department')
router.register(r'batch', views.BatchViewSet, basename='batch')
router.register(r'faculty', views.FacultyViewSet, basename='faculty')
router.register(r'semester', views.SemesterViewSet, basename='semester')
router.register(r'subject', views.SubjectViewSet, basename='subject')
router.register(r'marks', views.MarksViewSet, basename='marks')
router.register(r'section', views.SectionsViewSet, basename='section')
router.register(r'acadamics', views.AcademicRecordViewSet, basename='acadamics')
router.register(r'achievement', views.AchievementViewSet, basename='achievement')
router.register(r'portfolio', views.PortfolioViewSet, basename='portfolio')
router.register(r'ticket', views.TicketsViewSet, basename='ticket')

urlpatterns = router.urls

urlpatterns = [
    path('', include(router.urls)),
    path('user/register/',views.RegisterAPI.as_view()),
    path('user/login/',views.LoginAPI.as_view()),


]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += staticfiles_urlpatterns()