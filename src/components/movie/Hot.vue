<template>
   <div class="t-c hot-movie">
               <swipe class='swipe'></swipe>
               <div v-for='(item,key) in movieList' class="movie-list">
                   <div class="movie-list-item">
                      <div @click='showVideo(item)' class="movie-img-box">
                          <img class="movie-img" v-lazy="'https://gw.alicdn.com/'+item.poster+'_160x160Q75.jpg'" alt="">
                          <img src="./img/player.png" class="player" alt="播放icon">
                      </div>
                      <div @click='movieProjectData(item)' class="movie-item">
                          <p class="movie-showName overflow-text"><span>{{item.showName}}</span></p>
                          <p class="movie-star-box overflow-text"><star class='movie-star' :score='item.remark'></star><span class="movie-score">{{item.remark}}</span></p>
                          <p class="movie-director overflow-text">导演 ：{{item.director}} </p>
                          <p class="movie-leadingRole overflow-text">主演 ：{{item.leadingRole}} </p>
                      </div>
                      <img class="today-hot" v-if='key == 0' src="./img/today-hot.png" alt="今日最热">
                      <img class="week-hot" v-if='key == 0' src="./img/week-hot.png" alt="一周最热">
                      <span v-if='!!item.showMark' class="showMark">{{item.showMark}}</span>
                      <router-link to='/cinema' v-if='item.soldType == "NORMAL"' class="buy-btn">购票</router-link>
                      <router-link to='/cinema' v-if='item.soldType == "PRE"' class="buy-btn btn-advance">预售</router-link>
                   </div>
                    <p @click='activitiesDetailShow(item.activities)' class="movie-activities overflow-text" v-if='!!item.activities'>
                    <template v-if='!!item.activities[0].activityTag'>
                        <span class='activityExtTagMap'>{{item.activities[0].activityTag}}</span>
                        <span class="activities_line">|</span>
                        <span class="activityTitle">{{item.activities[0].activityTitle}}</span>
                    </template>
                    </p>
               </div>
               <transition name='move'>
                  <detail v-show='detailShow' :movieProject='movieProject'></detail>
              </transition>
               <transition name='move'>
                  <activities ref='activities' v-show='activitiesShow' :activitiesTxt='activitiesTxt'></activities>
              </transition>
              <transition name='fade'>
                  <videoModule ref='videoModule' :preview = 'preview' v-show='videoModuleShow'></videoModule>
              </transition>
          </div>
</template>
<script>
  var data = '';
  import detail from '@/components/movie/detail';
  import activities from '@/components/movie/activities';
  import swipe from "@/components/swipe/swipe";
  import videoModule from '@/components/movie/video';
  import star from '@/components/star/star';
  export default {
      data(){
        return {
           movieList : '',
           movieProject : '',
           detailShow : false,
           activitiesTxt : "",
           activitiesShow :false,
           preview : '',//video是否显示
           videoModuleShow : false,
        }
      },
      created(){
       if(!data){
          var href = location.href;
          var url = '/api/base/getAll';
        //   if(href.indexOf('taopp') != -1){
        //     url = '/data.json';
        //   }
        var param={table:'movie'}
          this.$http.post(url,param).then((response) => {
            var list = response.body;
           
              this.movieList = data = list;
              this.$parent.$parent.loaderShow = false;
            
          });
       }else{
         this.movieList = data;
         this.$parent.$parent.loaderShow = false;
       }
      },
      methods:{
         movieProjectData(data){
           this.detailShow = true;
           this.movieProject = data;
        },
        showVideo(data){ //给video传输数据
          this.preview = data;
          this.$parent.$parent.loaderShow = true;
          this.videoModuleShow = true;
        },
        activitiesDetailShow(data){
          this.activitiesTxt = data;
          this.activitiesShow = true;
        }
      },
      components:{swipe,star,detail,activities,videoModule},
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.t-c{
  text-align:center;
}
.swipe
  height:10rem !important;
.movie-star-box
  margin-top:10px;
  position:relative;
  .movie-score
    position:absolute;
    top:0rem;
    left:4.5rem;
.hot-movie
  padding-bottom:51px;
  .movie-list
    overflow:hidden;
    border-bottom:1px solid #e1e1e1;
    position:relative;
    color:#888;
    box-sizing:border-box;
    margin-left:15px;
    text-align:left;
    .movie-list-item
        padding:15px 15px 15px 0;
    .movie-img-box
        position:absolute;
        top:15px;
        left:0;
        width:3.5rem;
        .movie-img
           max-width:100%;
           max-height:100%
        .player
          width:1.5rem;
          position:absolute;
          top:50%;
          left:50%;
          margin-left:-0.75rem;
          margin-top:-0.75rem;
    .movie-item
      width:75%;
      padding-left:4rem;
      padding-right:15px;
      box-sizing:border-box;
      .movie-showName
          font-size:0.9rem;
          color:#333;
          padding-top:3px;
      .movie-wantCount
          margin-top:10px;
          font-size:0.8rem;
          color:#fea54c;
      .movie-director
          margin-top:10px;
          font-size:0.8rem;
      .movie-leadingRole
          font-size:0.8rem;
          width:100%;
          margin-top:10px;
    .movie-activities
        margin-left:4rem;
        line-height:36px;
        border-top:1px solid #e1e1e1;
        font-size:0.8rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .activityExtTagMap
            color:#fea54c;
        .activities_line
            padding:0 10px;
    .buy-btn
        border: 1px solid #ff4d64;
        color: #ff4d64;
        border-radius: 4px;
        padding:5px 8px;
        display:inline;
        font-size:0.8rem;
        position:absolute;
        right:30px;
        top:2.4rem;
    .btn-advance
        border: 1px solid #37b7ff;
        color: #37b7ff;
    .showMark
        position:absolute;
        right:-20px;
        top:10px;
        text-align:center;
        font-size:0.6rem;
        width:80px;
        line-height:20px;
        color:#fff;
        background:$color;
        transform:rotate(45deg);
    .today-hot,.week-hot
        width:1.5rem;
        position:absolute;
        top:0;
        right:55px;
    .today-hot
        right:5.3rem;
</style>
