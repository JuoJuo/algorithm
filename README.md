## 常用命令
```
# 查看端口占用，同时查看进程号
-netstat -lnp|grep port
- 杀掉进程
kill -9 pid
# 查看应用程序的进程是否在运行中
ps -ef | grep nginx
# 修改权限
chmod 777 or chmod u+r g+w o+x
# 软链接
ln -s /etc/nginx ~/nginx
# 动态的实时的查看文件，哪怕不断的在写文件
tail -f 
# 文件大小以k的单位显示
ls -lh
# 文件的id号也给显示出来
ls -li
# 文件名搜索(手动更新执行updatedb)
locate a.txt
# find搜索当前目录下的xxx（按照文件名、忽略大小写、所属用户、访问时间、改变时间、修改时间、按大小搜索）
 find . -name lrj.txt
 find . -iname lrj.TXT
 find . -user root
 find . -atime +5    access  五天前
 find . -ctime -5    change  五天内
 find . -mtime 5     modify   当天
 find . -size 100k 大小为100k的文件
 
 find /tmp -size +10k -a -size -20k -exec ls -lh {} \;
 -name 查找的文件名  -size文件大小  -iname忽略大小写
 -a 并且and   -o 跟 或者or
 /etc目录下，大于10KB并且小于20KB的文件
 exec 对上个命令的结果进行操作
```

```
# 过滤查找(忽略大小写，排除one之外的文本)
 cat a.txt | grep -iv one
#  修改文件的所属用户
 chown lrj  a.txt
#  关机
 - shutdown -r 22:00 22点重启
- shutdown -h 22:00 22点关机
- init 0 关机
- init 6 重启
#  查黑客
w
who
last
lastlog
#  拷贝目录(带属性的复制、复制目录)
copy a.txt b.txt -p
copy folder folder1 -r
```

## 压缩解压
```
出现时间先后顺序是：zip => gzip => bz2越晚出来的压缩格式，压缩比例越高

#zip用法：
zip 1.zip 1.txt
unzip 1.zip

zip -r book.zip book(是一个文件夹)
unzip book.zip

zip优点：可以压缩文件夹，压缩比例不如其他俩


#gzip用法：
gzip 1.txt
gzip -d  1.txt.gz（gunzip 也行）
- 压缩后1.txt不见了，解压后1.txt.gz也会被删除
- 但是我们不想被删的话
gzip -c 1.txt > 1.txt.gz

缺点：在压缩文件夹的时候gzip -r，会压缩文件夹里的所有文件。

#bzip2用法：
bzip2 1.txt
bzip2 -d 1.txt.bz2
完全不能压缩目录

#打包
tar -cvf 1.tar folder
tart -xvf 1.tar


#加入压缩
tar -zcvf 1.tar.gz folder  先打包再gzip
tart -zxvf 1.tar.gz 先解压，再解打包gzip

tar -jcvf 1.tar.bz2 folder  先打包再bzip2
tart -jxvf 1.tar.bz2 先解压，再解打包bzip2
```
## 分区内存
```
#查看分区使用情况，与挂载点
df -h
 #查看分区文件类型
df -T
#排除这个文件夹tmpfs 
df -x tmpfs 
#查看当前路径下所有文件或文件夹的大小
du -h （-H就是以G为单位）
# 查看硬盘分区情况
fisk -l
# 对硬盘sdb分区
fdisk /dev/sdb  
然后就是不断输入n创建新的分区，指定分区号，起始结束柱面，最后w，写入分区表
如果有创建拓展分区，那么必须创建逻辑分区才能行，逻辑分区的分区号是从5开始的，
也是输入n，在你创建了逻辑分区之后，会有选项让你创建逻辑分区

#格式化分区
mkfs.ext3 /dev/sdb1
mkfs -t ext4 /dev/sdb2

#挂载分区
mount /dev/sdb1 /mnt/u1 

#卸载分区
umount /mnt/u1
（/etc/fstab文件就是记录的分区挂载信息文件）

#查看内存使用情况
free 
#增加或修改交换分区大小
第一步：fdisk /dev/sdb  输入t修改，选择要修改的分区号，输入修改后的id类型（swap为82，普通linux分区为83）
第二步：格式化这个分区 mkswap /dev/sdb2
第三步：swapon /dev/sdb2把这个分区挂到交换分区


eg：挂载光驱。建个目录，直接mount /dev/sr0 /mnt/cdrom

MBR分区格式老的，最多只支持4个，所以才会有扩展分区，在拓展分区下可以再创建多个分区。
GPT新的分区格式，无上限。
parted
select /dev/sdc
mklabel gpt
mkpart
```
## 用户组
```
/etc/group
#组的名称:密码占位符:组编号:组中用户名列表(若为空表示与组名相同的用户名)
/etc/gshadow
#组的名称，密码占位符(*为空)，组管理者,为空表示都可以管理这个组，组中用户名列表
/etc/passwd
#用户名，密码占位符，用户编号，用户组编号，用户注释信息，用户主目录，shell类型
/etc/shadow
#所有用户的密码信息

#查看当前用户
whoami
#查看root用户的id
id root
#查看root组内有哪些用户
groups root

#用户组的增删改
groupadd stu
groupdel 222(组编号)
groupmod -n student stu

#用户的增删改
useradd -g teacher jack
useradd -d /home/jack jack
usermod -g jack root
userdel jack

#修改密码
passwd jack
#切换用户
su 用户名

```

## vim
```
a #after在光标后插入
i #insert 在光标处插入
o #other 在新一行插入
s #替换光标所在的字母插入

:2 #行
/jie #搜索
?jie #从光标位置开始向前搜索
n/N #下一个上一个


lkjh #右上下左

ctrl+f	#向下翻页
ctrl+b	#向上翻页
ctrl+d	#向下翻半页
ctrl+u	#向上翻半页

(n)dd #删除 
(n)yy #复制 
p #粘贴
x #删除一个 dw 删除一个 de 删除到end d$ 删除到行末
u #撤销
ZZ #保存退出

#全局替换
:%s/old/new/g
#替换2-5行
:2,5s/old/new/g
```



### Nginx
- 停止防火墙-----systemctl stop firewalld.service
- 永久关闭防火墙-----systemctl disable firewalld.service
- 安装依赖模块 yum  -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
- 安装依赖模块 yum  -y install wget httpd-tools vim
- 创建/etc/yum.repos.d/nginx.repo文件，写入
```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```
- yum install nginx -y
- 查看版本信息 nginx -v
- 编译参数： 安装目录和路径 nginx -V
- 查看rpm包nginx安装在哪儿的 rpm -ql nginx
- systemctl start nginx.service
- systemctl restart nginx.service
- systemctl reload nginx.service
- nginx -s reload

### 基础知识
```
IDE硬盘  ----------/dev/hd[a-d]
SCSI/SATA/USB硬盘-------/dev/sd[a-p]
光驱---------------/dev/cdrom或/dev/hdc
软盘----------/dev/fd[0-1]
打印机(25针)--------/dev/lp[0-2]
打印机(USB)-----------/dev/usb/lp[0-15]
鼠标-------/dev/mouse
```

### cat /etc/sysconfig/network-scripts/ifcfg-eth0
```
TYPE=Ethernet------------#网卡类型
DEVICE=eth0------------#网卡接口名称
ONBOOT=yes-----------#系统启动时是否自动加载
BOOTPROTO=static------------#启用地址协议 --static:静态协议 --bootp协议 --dhcp协议
IPADDR=192.168.1.11-------------#网卡IP地址
NETMASK=255.255.255.0----------#网卡网络地址<
GATEWAY=192.168.1.1----------#网卡网关地址
DNS1=10.203.104.41---------#网卡DNS地址
HWADDR=00:0C:29:13:5D:74--------#网卡设备MAC地址
BROADCAST=192.168.1.255------------#网卡广播地址
```

### 网卡接口关闭与激活
- ifdown eth0 #关闭网络
- ifup eth0 #启动网络
###  网络服务启动与关闭
- service network restart #重启网络服务


### 常见目录
- / 根目录
- /boot 启动目录，启动相关文件
- /dev 设备文件
- /etc 配置文件
- /home 普通用户的家目录,可以操作
- /lib 系统库保存目录
- /mnt 移动设备挂载目录
- /media 光盘挂载目录
- /misc 磁带机挂载目录
- /root 超级用户的家目录,可以操作
- /tmp 临时目录,可以操作
- /proc 不能直接操作，保存的是内存的挂载点
- /sys 不能直接操作，保存的是内存的挂载点
- /var 变量
- /bin 普通命令
- /sbin 命令保存目录，级用户才可以执行的命令
- /usr/bin 系统软件资源目录 面向普通用户的系统命令
- /usr/sbin 系统软件资源目录 面向超级用户的系统命令
