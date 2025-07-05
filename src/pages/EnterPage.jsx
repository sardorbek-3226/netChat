import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Header from '../components/Header';

function EnterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col items-center pt-32 ">
        {/* Hero section */}
        <div className="text-center flex flex-col items-center">
          <div className='bg-purple-500 rounded-2xl'>
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center">
            <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/speech-bubble--v1.png" alt="speech-bubble--v1"/>
          </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Yoshlar Uchun Networking <br /> Platformasi
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            O'zbekiston yoshlari o'rtasida professional aloqalarni kuchaytiring, yangi imkoniyatlar toping va karyerangizni rivojlantiring
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-6 mt-6 flex-wrap justify-center">
          <Link to="/register">
            <Button variant="destructive" size="lg" className="gap-2">
              <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/FFFFFF/person-male.png" alt="person-male" />
              Hoziroq Boshlash
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="gap-2">
              <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1" />
              Tadbirlarni Ko'rish
            </Button>
          </Link>
        </div>

        {/* Stats section */}
        <div className="flex flex-wrap justify-center gap-10 mt-14">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-3xl font-bold text-blue-600">2,500+</h3>
            <p className="text-gray-600">Faol Foydalanuvchi</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-3xl font-bold text-purple-600">150+</h3>
            <p className="text-gray-600">Oylik Tadbirlar</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-3xl font-bold text-pink-600">50+</h3>
            <p className="text-gray-600">Professional Guruh</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-3xl font-bold text-indigo-600">95%</h3>
            <p className="text-gray-600">Muvaffaqiyat Darajasi</p>
          </div>
        </div>

        {/* Why YouthConnect section */}
        <div className="flex flex-col items-center mt-20 gap-10 px-4">
          <div className="flex flex-col items-center gap-2 w-full max-w-[672px]">
            <h2 className="flex gap-2 text-3xl md:text-4xl font-bold mb-4 text-center">Nima uchun   <p className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>  NetChat  </p>   ?</h2>
            <p className="text-center text-xl text-gray-600 max-w-2xl mx-auto">
              Zamonaviy texnologiyalar yordamida networking jarayonini osonlashtiruvchi xususiyatlar
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-lg bg-white border shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="p-3 bg-green-100 inline-block rounded-xl mb-4">
                <img width="24" height="24" src="https://img.icons8.com/forma-light/24/40C057/lightning-bolt.png" alt="lightning-bolt" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Tezkor Ulanish</h3>
              <p className="text-sm text-muted-foreground">
                AI yordamida sizga mos odamlarni topish va ularga tezkor ulanish imkoniyati
              </p>
            </div>

            <div className="rounded-lg bg-white border shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="p-3 bg-purple-100 inline-block rounded-xl mb-4">
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/7950F2/globe.png" alt="globe" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Global Imkoniyatlar</h3>
              <p className="text-sm text-muted-foreground">
                Mahalliy va xalqaro tadbirlar, ishlar va loyihalarga kirish imkoniyati
              </p>
            </div>

            <div className="rounded-lg bg-white border shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="p-3 bg-pink-100 inline-block rounded-xl mb-4">
                <img width="24" height="24" src="https://img.icons8.com/forma-regular/24/F25081/goal.png" alt="goal" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Maqsadli Networking</h3>
              <p className="text-sm text-muted-foreground">
                O'z sohangiz va qiziqishlaringiz bo'yicha aniq maqsadli aloqalar o'rnatish
              </p>
            </div>
          </div>
          
          <div className='text-center mt-30 mb-10'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'> Everything You Need to<span className='text-blue-600'>Succeed</span></h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>Powerful features designed to help professionals connect, communicate, and grow together. </p>
          </div>
          {/* Features section */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>

            <div className="rounded-lg bg-card text-card-foreground p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className='p-0'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/228BE6/speech-bubble--v1.png" alt="speech-bubble--v1"/>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-900'>Real-time Messaging</h3>
                <p className='class="text-gray-600 leading-relaxed"'>Connect instantly with professionals through our advanced real-time chat system.</p>
              </div>
            </div>


            <div className="rounded-lg bg-card text-card-foreground p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className='p-0'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/228BE6/groups--v1.png" alt="groups--v1"/>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-900'>Professional Networking</h3>
                <p className='class="text-gray-600 leading-relaxed"'>Build meaningful connections with like-minded professionals across Uzbekistan.</p>
              </div>
            </div>
              
            <div className="rounded-lg bg-card text-card-foreground p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className='p-0'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/228BE6/tear-off-calendar.png" alt="tear-off-calendar"/>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-900'>Events & Meetups</h3>
                <p className='class="text-gray-600 leading-relaxed"'>Discover and join exciting events, workshops, and networking opportunities.</p>
              </div>
            </div>

            <div className="rounded-lg bg-card text-card-foreground p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className='p-0'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/228BE6/business--v1.png" alt="business--v1"/>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-900'>Career Opportunities</h3>
                <p className='class="text-gray-600 leading-relaxed"'>Find your dream job or discover talented individuals for your team.</p>
              </div>
            </div>

            <div className="rounded-lg bg-card text-card-foreground p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className='p-0'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/228BE6/saddle-stitched-booklet.png" alt="saddle-stitched-booklet"/>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-900'>Knowledge Sharing</h3>
                <p className='class="text-gray-600 leading-relaxed"'>Share insights, learn from experts, and grow together as a community.</p>
              </div>
            </div>

            <div className="rounded-lg bg-card text-card-foreground p-6 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className='p-0'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/228BE6/shield.png" alt="shield"/>
                </div>
                <h3 className='text-xl font-semibold mb-2 text-gray-900'>Secure & Private</h3>
                <p className='class="text-gray-600 leading-relaxed"'>Your data is protected with enterprise-grade security and privacy controls.</p>
              </div>
            </div>

          </div>


          <div className='w-full py-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl mt-20'>
            <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>Ready to Transform Your Network?</h2>
              <p className='text-xl mb-8 text-blue-100'>Join thousands of professionals who are already building their future with NetChat.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold'>Join NetChat Today</Link>
                <Link to="/login" className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-11 rounded-md border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg bg-transparent font-semibold'>Already a member?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterPage;
